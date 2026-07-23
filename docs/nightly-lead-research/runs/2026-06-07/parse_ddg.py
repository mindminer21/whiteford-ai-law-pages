#!/usr/bin/env python3
"""Extract real URLs from DuckDuckGo redirect links in saved HTML."""
import re, urllib.request, ssl, sys

ctx = ssl.create_default_context()

with open('/tmp/ddg_2026-06-07.html', 'r', errors='replace') as f:
    html = f.read()

# Extract URLs from uddy= redirect links
urls_found = re.findall(r'uddg=(https?://[^&]+)', html)
# Decode URL-encoded URLs
import urllib.parse
real_urls = list(set(urllib.parse.unquote(u) for u in urls_found))

# Also extract from title links (the visible text)
titles = re.findall(r'class="result__title">[^<]*<a[^>]*>([^<]+)</a>', html, re.DOTALL)

print('Found %d total DDG links' % len(urls_found))
print('Found %d unique real URLs' % len(real_urls))
for i, (url, title) in enumerate(zip(real_urls, titles[:len(real_urls)])[0:15]):
    host = url.split('//')[1].split('/')[0] if '://' in url else '?'
    # Filter out DDG and DuckDuckGo URLs
    if 'duckduckgo' in url.lower() or 'ddg' in url.lower():
        continue
    print('%d. [%s] %s' % (i+1, host, title.strip()))
    print('   URL: %s' % url)
    
    # Fetch the page to see if it's a viable prospect
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
        resp = urllib.request.urlopen(req, context=ctx, timeout=10)
        code = resp.getcode()
        page_text = resp.read().decode('utf-8', errors='replace')[:1500]
        # Extract title
        title_match = re.search(r'<title>([^<]*)</title>', page_text)
        html_title = title_match.group(1) if title_match else 'N/A'
        # Extract first meaningful sentence
        clean = re.sub(r'<[^>]+>', ' ', page_text)
        sentences = [s.strip() for s in clean.split('.')[3:5] if len(s.strip()) > 50]
        snippet = sentences[0] if sentences else 'N/A'
        print('   Status: %d | Title: %s' % (code, html_title[:80]))
        print('   Snippet: %s' % snippet[:200])
    except Exception as e:
        print('   FETCH FAILED: %s' % str(e)[:100])
    print()

# Additional DDG search with different query
print('[EXTRA SEARCH: AI governance compliance hiring 2025 2026]')
extra_url = 'https://html.duckduckgo.com/html/?q=AI+governance+compliance+hiring+2025+2026'
try:
    req = urllib.request.Request(extra_url, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html',
    })
    resp = urllib.request.urlopen(req, context=ctx, timeout=15)
    extra_html = resp.read().decode('utf-8', errors='replace')
    extra_urls = re.findall(r'uddg=(https?://[^&]+)', extra_html)
    extra_real = list(set(urllib.parse.unquote(u) for u in extra_urls if 'duckduckgo' not in u.lower()))
    extra_titles = re.findall(r'class="result__title">[^<]*<a[^>]*>([^<]+)</a>', extra_html, re.DOTALL)
    for i, (url, title) in enumerate(zip(extra_real[:10], extra_titles[:10])):
        host = url.split('//')[1].split('/')[0] if '://' in url else '?'
        print('  E%d. [%s] %s' % (i+1, host, title.strip()))
        print('     URL: %s' % url)
except Exception as e:
    print('  EXTRA SEARCH FAILED: %s' % str(e)[:100])
