import sys
import os

# Add project root to path so we can import app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../source/bq-release-notes")))

import app

try:
    print("Testing fetch and parse...")
    data = app.fetch_feed(force=True)
    print(f"Parsed {len(data)} individual updates successfully!")
    
    if data:
        print("\nFirst parsed update sample:")
        for k, v in data[0].items():
            if k in ['content_html', 'content_text']:
                print(f"  {k}: {v[:200]}...")
            else:
                print(f"  {k}: {v}")
                
        print("\nSecond parsed update sample:")
        for k, v in data[1].items():
            if k in ['content_html', 'content_text']:
                print(f"  {k}: {v[:200]}...")
            else:
                print(f"  {k}: {v}")
except Exception as e:
    print("Error during test:", e)
    import traceback
    traceback.print_exc()
