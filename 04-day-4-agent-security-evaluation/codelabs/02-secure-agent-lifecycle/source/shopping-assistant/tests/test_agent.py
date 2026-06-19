import pytest

from app.agent import (
    DISCOUNT_CODES,
    REDEEMED_CODES,
    REGISTERED_USERS,
    redeem_discount,
)


@pytest.fixture(autouse=True)
def clean_redeemed_codes():
    """Resets the redeemed codes set before and after each test for isolation."""
    REDEEMED_CODES.clear()
    yield
    REDEEMED_CODES.clear()


def test_redeem_discount_success():
    # Setup
    valid_user = "user123"
    valid_code = "WELCOME50"
    assert valid_user in REGISTERED_USERS
    assert valid_code in DISCOUNT_CODES

    # Execution
    result = redeem_discount(valid_code, valid_user, tool_context=None)

    # Assertions
    assert result["status"] == "success"
    assert "Successfully redeemed" in result["message"]
    assert result["discount_value"] == 50
    assert result["user_id"] == valid_user
    assert valid_code in REDEEMED_CODES


def test_redeem_discount_twice_fails():
    # Setup
    valid_user = "user123"
    valid_code = "WELCOME50"

    # First redemption should succeed
    res1 = redeem_discount(valid_code, valid_user, tool_context=None)
    assert res1["status"] == "success"
    assert valid_code in REDEEMED_CODES

    # Second redemption should fail
    res2 = redeem_discount(valid_code, valid_user, tool_context=None)
    assert res2["status"] == "error"
    assert "already been redeemed" in res2["message"]
    assert len(REDEEMED_CODES) == 1


def test_redeem_discount_unknown_code_fails():
    # Setup
    valid_user = "user123"
    invalid_code = "UNKNOWN99"

    # Execution
    result = redeem_discount(invalid_code, valid_user, tool_context=None)

    # Assertions
    assert result["status"] == "error"
    assert "Unknown discount code" in result["message"]
    assert invalid_code not in REDEEMED_CODES
    assert len(REDEEMED_CODES) == 0


def test_redeem_discount_missing_user_id_fails():
    # Setup
    valid_code = "WELCOME50"

    # Execution with empty user ID
    result_empty = redeem_discount(valid_code, "", tool_context=None)
    assert result_empty["status"] == "error"
    assert "Guest or missing user IDs" in result_empty["message"]

    # Execution with spaces
    result_spaces = redeem_discount(valid_code, "   ", tool_context=None)
    assert result_spaces["status"] == "error"
    assert "Guest or missing user IDs" in result_spaces["message"]

    assert valid_code not in REDEEMED_CODES
    assert len(REDEEMED_CODES) == 0


def test_redeem_discount_guest_user_id_fails():
    # Setup
    valid_code = "WELCOME50"

    # Execution with guest user ID
    result = redeem_discount(valid_code, "guest", tool_context=None)

    # Assertions
    assert result["status"] == "error"
    assert "Guest or missing user IDs" in result["message"]
    assert valid_code not in REDEEMED_CODES
    assert len(REDEEMED_CODES) == 0


def test_redeem_discount_unregistered_user_id_fails():
    # Setup
    valid_code = "WELCOME50"
    unregistered_user = "unregistered_user_999"
    assert unregistered_user not in REGISTERED_USERS

    # Execution
    result = redeem_discount(valid_code, unregistered_user, tool_context=None)

    # Assertions
    assert result["status"] == "error"
    assert "is not a registered user" in result["message"]
    assert valid_code not in REDEEMED_CODES
    assert len(REDEEMED_CODES) == 0


def test_redeem_discount_failure_does_not_mutate_state():
    # Verify that failed code redemptions do not mutate the state
    valid_user = "user123"
    invalid_code = "INVALID99"

    redeem_discount(invalid_code, valid_user, tool_context=None)
    assert len(REDEEMED_CODES) == 0

    redeem_discount("WELCOME50", "guest", tool_context=None)
    assert len(REDEEMED_CODES) == 0
