// State management
let releaseNotes = [];
let filteredNotes = []; // Track filtered notes for CSV export
let selectedNote = null;
let currentSearch = "";
let currentFilter = "ALL";

// DOM Elements
const notesList = document.getElementById("notes-list");
const detailPanel = document.getElementById("detail-panel");
const emptyState = document.getElementById("empty-state");
const detailView = document.getElementById("detail-view");
const detailBadge = document.getElementById("detail-badge");
const detailDate = document.getElementById("detail-date");
const detailTitle = document.getElementById("detail-title");
const noteContent = document.getElementById("note-content");
const detailLink = document.getElementById("detail-link");

// Controls
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search-btn");
const typeFilter = document.getElementById("type-filter");
const refreshBtn = document.getElementById("refresh-btn");
const refreshIcon = document.getElementById("refresh-icon");
const cacheTimeDisplay = document.getElementById("cache-time");
const resultsCount = document.getElementById("results-count");
const mobileBackBtn = document.getElementById("mobile-back-btn");
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");
const exportCsvBtn = document.getElementById("export-csv-btn");

// Tweet Composer
const tweetText = document.getElementById("tweet-text");
const charCounter = document.getElementById("char-counter");
const charWarning = document.getElementById("char-warning");
const tweetBtn = document.getElementById("tweet-btn");
const copyBtn = document.getElementById("copy-btn");

// Toast Notification
const toast = document.getElementById("toast");
const toastIcon = document.getElementById("toast-icon");
const toastMessage = document.getElementById("toast-message");

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    fetchReleaseNotes();
    setupEventListeners();
});

// Initialize theme state from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeIcon.className = "fa-solid fa-moon";
    } else {
        document.body.classList.remove("light-theme");
        themeIcon.className = "fa-solid fa-sun";
    }
}

// Setup event listeners
function setupEventListeners() {
    // Refresh button
    refreshBtn.addEventListener("click", () => fetchReleaseNotes(true));
    
    // Search input
    searchInput.addEventListener("input", (e) => {
        currentSearch = e.target.value.trim().toLowerCase();
        clearSearchBtn.style.display = currentSearch ? "block" : "none";
        filterAndRenderNotes();
    });
    
    // Clear search button
    clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        currentSearch = "";
        clearSearchBtn.style.display = "none";
        filterAndRenderNotes();
        searchInput.focus();
    });

    // Type filter
    typeFilter.addEventListener("change", (e) => {
        currentFilter = e.target.value;
        filterAndRenderNotes();
    });

    // Tweet text change
    tweetText.addEventListener("input", () => {
        updateCharCount();
    });

    // Tweet button
    tweetBtn.addEventListener("click", publishTweet);

    // Copy to clipboard button
    copyBtn.addEventListener("click", copyToClipboard);

    // Export CSV button
    exportCsvBtn.addEventListener("click", exportToCSV);

    // Theme toggle button
    themeToggleBtn.addEventListener("click", toggleTheme);

    // Mobile back button
    mobileBackBtn.addEventListener("click", () => {
        detailPanel.classList.remove("active");
        // Deselect current active list card visually on mobile exit
        const activeCard = document.querySelector(".note-card.active");
        if (activeCard) activeCard.classList.remove("active");
        selectedNote = null;
        emptyState.classList.remove("hidden");
        detailView.classList.add("hidden");
    });
}

// Fetch release notes from backend
async function fetchReleaseNotes(force = false) {
    toggleLoading(true);
    
    const url = force ? "/api/release-notes?refresh=true" : "/api/release-notes";
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success) {
            releaseNotes = result.data;
            updateCacheDisplay(result.cached_at);
            filterAndRenderNotes();
            
            if (force) {
                showToast("Release notes refreshed live!", "fa-circle-check");
            }
        } else {
            console.error("API error:", result.error);
            showToast("Failed to fetch release notes: " + result.error, "fa-circle-exclamation", true);
            renderErrorState(result.error);
        }
    } catch (error) {
        console.error("Network error:", error);
        showToast("Network error. Please try again.", "fa-circle-exclamation", true);
        renderErrorState(error.message);
    } finally {
        toggleLoading(false);
    }
}

// Show/hide loading status
function toggleLoading(isLoading) {
    if (isLoading) {
        refreshBtn.disabled = true;
        refreshIcon.classList.add("spin");
        if (releaseNotes.length === 0) {
            notesList.innerHTML = `
                <div class="loading-state">
                    <div class="double-spinner"></div>
                    <p>Fetching latest release notes...</p>
                </div>`;
        }
    } else {
        refreshBtn.disabled = false;
        refreshIcon.classList.remove("spin");
    }
}

// Update Cache Timestamp
function updateCacheDisplay(cachedAtString) {
    if (!cachedAtString) {
        cacheTimeDisplay.textContent = "Synced";
        return;
    }
    
    // Parse the date (yyyy-mm-dd hh:mm:ss) and format nicely
    try {
        const parts = cachedAtString.split(" ");
        const timePart = parts[1].substring(0, 5); // hh:mm
        cacheTimeDisplay.textContent = `Synced: ${timePart}`;
        cacheTimeDisplay.title = `Last fetched: ${cachedAtString}`;
    } catch (e) {
        cacheTimeDisplay.textContent = `Synced: ${cachedAtString}`;
    }
}

// Filter and render release notes
function filterAndRenderNotes() {
    filteredNotes = releaseNotes.filter(note => {
        // Filter by category
        const matchesCategory = currentFilter === "ALL" || 
            note.type.toUpperCase() === currentFilter;
            
        // Filter by search text
        const matchesSearch = !currentSearch || 
            note.date.toLowerCase().includes(currentSearch) ||
            note.type.toLowerCase().includes(currentSearch) ||
            note.content_text.toLowerCase().includes(currentSearch);
            
        return matchesCategory && matchesSearch;
    });

    resultsCount.textContent = `${filteredNotes.length} update${filteredNotes.length === 1 ? '' : 's'} found`;
    renderNotesList(filteredNotes);
}

// Render list of cards
function renderNotesList(notes) {
    if (notes.length === 0) {
        notesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
                <h3>No updates found</h3>
                <p>Try broadening your search or selecting a different category.</p>
            </div>`;
        return;
    }

    notesList.innerHTML = "";
    notes.forEach(note => {
        const card = document.createElement("div");
        card.className = "note-card";
        if (selectedNote && selectedNote.id === note.id) {
            card.classList.add("active");
        }

        const typeClass = getBadgeClass(note.type);
        
        card.innerHTML = `
            <div class="card-header">
                <span class="badge ${typeClass}">${note.type}</span>
                <span class="card-date">${note.date}</span>
            </div>
            <div class="card-snippet">${escapeHtml(note.content_text)}</div>
        `;

        card.addEventListener("click", () => selectNote(note, card));
        notesList.appendChild(card);
    });
}

// Select a release note
function selectNote(note, cardElement) {
    selectedNote = note;
    
    // Manage active status in list
    document.querySelectorAll(".note-card").forEach(c => c.classList.remove("active"));
    cardElement.classList.add("active");

    // Populate detail panel
    detailBadge.className = `badge ${getBadgeClass(note.type)}`;
    detailBadge.textContent = note.type;
    detailDate.innerHTML = `<i class="fa-regular fa-calendar"></i> ${note.date}`;
    detailTitle.textContent = `${note.type} Update`;
    noteContent.innerHTML = note.content_html;
    detailLink.href = note.link || "https://cloud.google.com/bigquery/docs/release-notes";

    // Draft prefilled tweet
    const draft = generateTweetDraft(note);
    tweetText.value = draft;
    updateCharCount();

    // Toggle views
    emptyState.classList.add("hidden");
    detailView.classList.remove("hidden");

    // Scroll detail to top
    const scrollContainer = document.querySelector(".detail-body-scroll");
    if (scrollContainer) scrollContainer.scrollTop = 0;

    // Mobile UI: Slide panel active
    detailPanel.classList.add("active");
}

// Generate prefilled X/Twitter text
function generateTweetDraft(note) {
    const maxLen = 280;
    const link = note.link || "https://cloud.google.com/bigquery/docs/release-notes";
    const tag = `#BigQuery`;
    
    // Formatting: BigQuery Update: [Feature] Text... link #BigQuery
    const prefix = `BigQuery [${note.type}]: `;
    const suffix = `\n\nInfo: ${link} ${tag}`;
    
    // safety margin (accounting for newlines / spacing)
    const availableLength = maxLen - prefix.length - suffix.length - 2;
    
    let text = note.content_text.trim();
    
    // Split text into sentences using lookbehind (keeps ending punctuation like . ! ?)
    let sentences = text.split(/(?<=[.!?])\s+/);
    if (!sentences || sentences.length === 0 || sentences[0] === "") {
        sentences = [text];
    }
    
    let draftText = "";
    let addedAny = false;
    
    // Try to fit as many full sentences as possible
    for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i].trim();
        if (!sentence) continue;
        
        const testText = draftText ? (draftText + " " + sentence) : sentence;
        if (testText.length <= availableLength) {
            draftText = testText;
            addedAny = true;
        } else {
            break; // Stop adding if we exceed available length
        }
    }
    
    // Fallback: If not even the first sentence fits, truncate cleanly at word boundary
    if (!addedAny) {
        const truncateSuffix = ". Read more in the docs.";
        const maxTruncateLength = availableLength - truncateSuffix.length;
        
        if (maxTruncateLength > 10) {
            let truncatedText = text.substring(0, maxTruncateLength);
            const lastSpace = truncatedText.lastIndexOf(" ");
            if (lastSpace > 0) {
                truncatedText = truncatedText.substring(0, lastSpace);
            }
            // Strip trailing punctuation
            truncatedText = truncatedText.replace(/[,.;:!?]$/, "");
            draftText = truncatedText + truncateSuffix;
        } else {
            // Safe fallback if available space is extremely small
            draftText = text.substring(0, availableLength - 3) + "...";
        }
    }
    
    return `${prefix}${draftText}${suffix}`;
}

// Update tweet composer character counts and display warning
function updateCharCount() {
    const count = tweetText.value.length;
    charCounter.textContent = `${count} / 280`;

    if (count > 280) {
        charCounter.style.color = "#f87171"; // Red
        charWarning.classList.remove("hidden");
        tweetBtn.disabled = true;
    } else {
        charCounter.style.color = "var(--text-secondary)";
        charWarning.classList.add("hidden");
        tweetBtn.disabled = false;
    }
}

// Redirect user to Twitter/X Composer Intent page
function publishTweet() {
    if (!selectedNote) return;
    
    const tweetContent = tweetText.value;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`;
    
    window.open(tweetUrl, "_blank", "width=600,height=400,resizable=yes");
    showToast("Opening X to compose post!", "fa-brands fa-x-twitter");
}

// Toggle Theme (Light/Dark Mode)
function toggleTheme() {
    const isLightTheme = document.body.classList.toggle("light-theme");
    if (isLightTheme) {
        themeIcon.className = "fa-solid fa-moon";
        localStorage.setItem("theme", "light");
        showToast("Switched to Light Mode", "fa-moon");
    } else {
        themeIcon.className = "fa-solid fa-sun";
        localStorage.setItem("theme", "dark");
        showToast("Switched to Dark Mode", "fa-sun");
    }
}

// Copy current tweet summary to clipboard with standard and fallback operations
function copyToClipboard() {
    if (!selectedNote) return;
    
    const textToCopy = tweetText.value;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                showToast("Copied update to clipboard!", "fa-copy");
            })
            .catch(err => {
                console.error("Clipboard API failed:", err);
                fallbackCopyToClipboard(textToCopy);
            });
    } else {
        fallbackCopyToClipboard(textToCopy);
    }
}

// Fallback copy utility for older browsers or non-HTTPS contexts
function fallbackCopyToClipboard(text) {
    try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        // Make textarea invisible and out-of-viewport
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        
        if (successful) {
            showToast("Copied update to clipboard!", "fa-copy");
        } else {
            showToast("Failed to copy update.", "fa-circle-exclamation", true);
        }
    } catch (err) {
        console.error("Fallback copy failed:", err);
        showToast("Failed to copy update.", "fa-circle-exclamation", true);
    }
}

// Export currently visible/filtered release notes to a properly formatted CSV file
function exportToCSV() {
    if (filteredNotes.length === 0) {
        showToast("No release notes to export!", "fa-circle-exclamation", true);
        return;
    }
    
    // CSV Header row
    const headers = ["Date", "Category", "Description", "Link"];
    const rows = [headers];
    
    filteredNotes.forEach(note => {
        rows.push([
            note.date,
            note.type,
            note.content_text,
            note.link || "https://docs.cloud.google.com/bigquery/docs/release-notes"
        ]);
    });
    
    // Format rows correctly (escape quotes and wrap cell value)
    const csvContent = rows.map(row => 
        row.map(value => {
            if (value === null || value === undefined) return '""';
            const escaped = value.toString().replace(/"/g, '""');
            return `"${escaped}"`;
        }).join(",")
    ).join("\n");
    
    try {
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "bigquery-release-notes.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast("CSV exported successfully!", "fa-file-csv");
    } catch (err) {
        console.error("CSV download failed:", err);
        showToast("Failed to export CSV.", "fa-circle-exclamation", true);
    }
}

// Helpers
function getBadgeClass(type) {
    const t = type.toUpperCase();
    if (t.includes("FEATURE")) return "badge-feature";
    if (t.includes("ANNOUNCEMENT")) return "badge-announcement";
    if (t.includes("DEPRECATED") || t.includes("DEPRECATION")) return "badge-deprecated";
    if (t.includes("ISSUE") || t.includes("BUG")) return "badge-issue";
    if (t.includes("CHANGED") || t.includes("CHANGE")) return "badge-changed";
    return "badge-update";
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function renderErrorState(message) {
    notesList.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon" style="color: #f87171;"><i class="fa-solid fa-triangle-exclamation"></i></div>
            <h3>Error loading updates</h3>
            <p>${escapeHtml(message)}</p>
            <button class="btn btn-primary" onclick="fetchReleaseNotes(true)" style="margin-top: 12px;">Try Again</button>
        </div>`;
}

// Toast Alert Manager
let toastTimeout;
function showToast(message, iconClass, isError = false) {
    clearTimeout(toastTimeout);
    
    toastMessage.textContent = message;
    toastIcon.className = `fa-solid ${iconClass} toast-icon`;
    
    if (isError) {
        toast.style.backgroundColor = "#dc2626"; // red
    } else {
        toast.style.backgroundColor = "#10b981"; // green
        if (iconClass.includes("twitter")) {
            toast.style.backgroundColor = "var(--bg-x)";
        }
    }
    
    toast.classList.remove("hidden");
    
    toastTimeout = setTimeout(() => {
        toast.classList.add("hidden");
    }, 4000);
}
