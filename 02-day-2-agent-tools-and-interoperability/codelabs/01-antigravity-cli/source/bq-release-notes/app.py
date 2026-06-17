import os
import time
import requests
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Feed URL
FEED_URL = "https://docs.cloud.google.com/feeds/bigquery-release-notes.xml"

# In-memory cache
cache_data = None
cache_time = 0
CACHE_EXPIRY = 300  # Cache duration: 5 minutes

def parse_release_notes(xml_data):
    root = ET.fromstring(xml_data)
    ns = {'atom': 'http://www.w3.org/2005/Atom'}
    entries = root.findall('.//atom:entry', ns)
    
    parsed_updates = []
    
    for entry in entries:
        # Get the entry title (usually the date, e.g., "June 16, 2026")
        title_el = entry.find('atom:title', ns)
        date_str = title_el.text.strip() if title_el is not None else "Unknown Date"
        
        # Get the timestamp (updated time)
        updated_el = entry.find('atom:updated', ns)
        timestamp = updated_el.text.strip() if updated_el is not None else ""
        
        # Get the alternate link
        link_el = entry.find('atom:link', ns)
        link = link_el.attrib.get('href', '') if link_el is not None else ''
        
        # Get the entry ID
        entry_id_el = entry.find('atom:id', ns)
        entry_id = entry_id_el.text.strip() if entry_id_el is not None else ""
        
        # Parse the content HTML
        content_el = entry.find('atom:content', ns)
        content_html = content_el.text if content_el is not None else ""
        
        if not content_html:
            continue
            
        soup = BeautifulSoup(content_html, 'html.parser')
        h3_tags = soup.find_all('h3')
        
        if not h3_tags:
            # Single update without h3 subheaders
            text_content = soup.get_text().strip()
            text_content = " ".join(text_content.split())
            parsed_updates.append({
                'id': entry_id,
                'date': date_str,
                'timestamp': timestamp,
                'link': link,
                'type': 'Update',
                'content_html': content_html,
                'content_text': text_content
            })
        else:
            for idx, h3 in enumerate(h3_tags):
                update_type = h3.get_text().strip()
                
                # Collect sibling elements until the next h3 tag
                sibling_html = []
                curr = h3.next_sibling
                while curr and curr.name != 'h3':
                    sibling_html.append(str(curr))
                    curr = curr.next_sibling
                
                update_html = "".join(sibling_html).strip()
                sub_soup = BeautifulSoup(update_html, 'html.parser')
                text_content = sub_soup.get_text().strip()
                text_content = " ".join(text_content.split())
                
                # Combine original entry ID with index for uniqueness
                update_id = f"{entry_id}_{idx}"
                
                parsed_updates.append({
                    'id': update_id,
                    'date': date_str,
                    'timestamp': timestamp,
                    'link': link,
                    'type': update_type,
                    'content_html': update_html,
                    'content_text': text_content
                })
                
    return parsed_updates

def fetch_feed(force=False):
    global cache_data, cache_time
    now = time.time()
    
    if force or not cache_data or (now - cache_time) > CACHE_EXPIRY:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(FEED_URL, headers=headers, timeout=15)
        response.raise_for_status()
        
        updates = parse_release_notes(response.content)
        cache_data = updates
        cache_time = now
        
    return cache_data

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/release-notes')
def get_release_notes():
    force_refresh = request.args.get('refresh', '').lower() == 'true'
    try:
        data = fetch_feed(force=force_refresh)
        return jsonify({
            'success': True,
            'data': data,
            'cached_at': time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(cache_time))
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
