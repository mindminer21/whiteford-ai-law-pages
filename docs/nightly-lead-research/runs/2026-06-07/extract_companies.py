#!/usr/bin/env python3
"""Extract named companies from saved TechCrunch and topstartups.io HTML pages."""
import re, urllib.request, ssl, sys

ctx = ssl.create_default_context()

def extract_companies_from_techcrunch(filepath):
    """Extract company names from TechCrunch article."""
    with open(filepath, 'r', errors='replace') as f:
        html = f.read()
    companies = []
    # TechCrunch lists companies with company names in links
    for m in re.finditer(r'<a[^>]*href="[^"]*"/a>', html):
        companies.append(m.group(0))
    # Look for company name patterns - search for names in title tags, h2, headings
    for m in re.finditer(r'>([^<]{3,60})</a>', html):
        name = m.group(1).strip()
        if len(name) > 3 and re.match(r'^[\w\s&()-]+$', name):
            companies.append(name)
    # Try a broader approach: find all h2/h3 title-like content between divs/sections
    section_titles = re.findall(r'<h[23][^>]*class="[^"]*entry-title[^"]*"[^>]*>([^<]+)</h[23]>', html, re.DOTALL)
    return section_titles

def extract_companies_from_listicle(filepath):
    """Extract company names from listicle page like topstartups.io."""
    with open(filepath, 'r', errors='replace') as f:
        html = f.read()
    companies = []
    # Look for company names in list items or cards
    for m in re.finditer(r'<[aA][^>]*href="[^"]*/company/[^"]*"[^>]*>([^<]+)</[aA]>', html, re.DOTALL):
        companies.append(m.group(1).strip())
    # Also try any company/organization patterns
    for m in re.finditer(r'>([^<]{4,50})</[aApP]', html):
        name = m.group(1).strip()
        if name and re.match(r'^[\w\s&()-]+$', name) and len(name) < 60:
            companies.append(name)
    # Try to extract from structured data (JSON-LD, schema)
    jsonld = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
    return companies, jsonld

print('=== TECHCRUNCH EXTRACTION ===')
tc_titles = extract_companies_from_techcrunch('/tmp/tc_100m_ai_2025.html')
# Print first 30 non-DuckDuckGo titles
for i, t in enumerate(tc_titles[:50]):
    t = t.strip()
    if t and 'techcrunch' not in t.lower() and '.' not in t[:3] and 'techcrunch' not in t.lower():
        print('%d. %s' % (i+1, t))

print('\n=== TOPSTARTUPS.IO EXTRACTION ===')
ts_companies, ts_jsonld = extract_companies_from_listicle('/tmp/topstartups_ai.html')
for i, c in enumerate(ts_companies[:80]):
    if c and len(c) > 4 and len(c) < 50:
        print('%d. %s' % (i+1, c))

# Now let's also extract URLs from the TC article to visit individual company links
print('\n=== TC ARTICLE LINKS ===')
with open('/tmp/tc_100m_ai_2025.html', 'r', errors='replace') as f:
    tc_html = f.read()
# Find all href patterns with company-like patterns
tc_links = re.findall(r'href="(https?://[^"]+)"', tc_html)
for link in set(tc_links):
    if any(skip in link.lower() for skip in ['facebook', 'twitter', 'linkedin', 'crunchbase', 'techcrunch.com', 'bitly', 'short', 'wp.', 'wordpress', 'amazon']):
        continue
    if any(skip in link.lower() for skip in ['mailto:']):
        continue
    host = link.split('//')[1].split('/')[0] if '://' in link else '?'
    print('LINK: %s' % link)
