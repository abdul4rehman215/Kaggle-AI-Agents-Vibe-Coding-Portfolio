import urllib.request
import xml.etree.ElementTree as ET

url = "https://docs.cloud.google.com/feeds/bigquery-release-notes.xml"
headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as response:
    xml_data = response.read()

root = ET.fromstring(xml_data)
ns = {'atom': 'http://www.w3.org/2005/Atom'}
entries = root.findall('.//atom:entry', ns)

for i, entry in enumerate(entries[:5]):
    title = entry.find('atom:title', ns).text
    updated = entry.find('atom:updated', ns).text
    content_el = entry.find('atom:content', ns)
    content_html = content_el.text if content_el is not None else ""
    
    print(f"--- Entry {i+1}: {title} (Updated: {updated}) ---")
    print(content_html[:1500])
    print("\n" + "="*40 + "\n")
