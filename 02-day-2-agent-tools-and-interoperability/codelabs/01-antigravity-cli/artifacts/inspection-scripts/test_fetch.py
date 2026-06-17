import urllib.request
import xml.etree.ElementTree as ET

url = "https://docs.cloud.google.com/feeds/bigquery-release-notes.xml"

try:
    print(f"Fetching {url}...")
    headers = {'User-Agent': 'Mozilla/5.0'}
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        xml_data = response.read()
    
    print("Fetched successfully. XML sample (first 1000 chars):")
    print(xml_data[:1000].decode('utf-8'))
    
    # Try parsing
    root = ET.fromstring(xml_data)
    print("\nRoot tag:", root.tag)
    
    # List namespace details if present
    ns = {}
    if '}' in root.tag:
        ns_url = root.tag.split('}')[0][1:]
        ns['atom'] = ns_url
        print("Detected Namespace:", ns_url)
    
    # Find child elements
    entries = root.findall('.//atom:entry', ns) if 'atom' in ns else root.findall('.//entry')
    if not entries:
        entries = root.findall('.//item') # RSS fallback
    
    print(f"\nFound {len(entries)} entries/items.")
    if entries:
        first_entry = entries[0]
        print("\nFirst entry children:")
        for child in first_entry:
            print(f"  {child.tag}: {child.text[:100] if child.text else 'None'}")
except Exception as e:
    print("Error:", e)
