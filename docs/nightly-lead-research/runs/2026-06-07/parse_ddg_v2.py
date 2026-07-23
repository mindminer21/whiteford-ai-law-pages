#!/usr/bin/env python3
"""Extract real URLs from DuckDuckGo redirect uddy= links, fetch them, qualify prospects."""
import re, urllib.request, ssl, urllib.parse, sys

ctx = ssl.create_default_context()

# Read DDG results file
with open('/tmp/ddg_2026-06-07.html', 'r', errors='replace') as f:
    html = f.read()

# Extract all uddy= links (URL-encoded)
links = re.findall(r'uddg=([^"&]+)', html)
unique_urls = sorted(set(urllib.parse.unquote(u) for u in links if 'duckduckgo' not in u.lower()))

# Also extract titles
titles_html = re.findall(r'class="result__title">[^<]*<a[^>]*>([^<]+)</a>', html, re.DOTALL)

print('Total DDG links: %d' % len(links))
print('Unique real URLs: %d' % len(unique_urls))
print()

# Extract just the domain-level URL (strip /best, /raises/ai-ml etc)
def strip_path(url):
    """Return domain+path prefix for dedup by site type."""
    parts = url.split('/')
    if len(parts) >= 3:
        # Return protocol + domain + top-level path
        return parts[0] + '//' + parts[2]
    return url

seen = set()
filtered = []
for u in unique_urls:
    key = strip_path(u)
    if key not in seen:
        seen.add(key)
        filtered.append(u)

print('Filtered to %d unique sites' % len(filtered))
for u in filtered:
    host = u.split('//')[1].split('/')[0] if '://' in u else '?'
    print('  %s (%s)' % (u, host))
    # Fetch for qualification
    try:
        req = urllib.request.Request(u, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
        resp = urllib.request.urlopen(req, context=ctx, timeout=10)
        code = resp.getcode()
        page_text = resp.read().decode('utf-8', errors='replace')[:2000]
        title_match = re.search(r'<title>([^<]*)</title>', page_text)
        html_title = title_match.group(1) if title_match else 'N/A'
        clean = re.sub(r'<[^>]+>', ' ', page_text)
        sentences = [s.strip() for s in clean.split('.')[:4] if len(s.strip()) > 40]
        snippet = sentences[0] if sentences else 'N/A'
        print('    [HTTP %d] %s' % (code, html_title[:80]))
        print('    %s' % snippet[:220])
    except Exception as e:
        print('    [FETCH FAILED: %s]' % str(e)[:120])
    print()

# Additional DDG search: AI compliance governance hiring 2025 2026
print('[BONUS QUERY: AI compliance governance hiring 2025 2026]')
bonus_url = 'https://html.duckduckgo.com/html/?q=AI+compliance+governance+hiring+2025+2026'
try:
    req = urllib.request.Request(bonus_url, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html',
    })
    resp = urllib.request.urlopen(req, context=ctx, timeout=15)
    bonus_html = resp.read().decode('utf-8', errors='replace')
    bonus_links = re.findall(r'uddg=([^"&]+)', bonus_html)
    bonus_real = sorted(set(urllib.parse.unquote(u) for u in bonus_links if 'duckduckgo' not in u.lower()))
    bonus_titles = re.findall(r'class="result__title">[^<]*<a[^>]*>([^<]+)</a>', bonus_html, re.DOTALL)
    bonus_seen = set()
    for i, url in enumerate(bonus_real[:10]):
        stripped = url.split('?')[0].split('/')[0:4]
        key = '/'.join(stripped)
        if key in bonus_seen:
            continue
        bonus_seen.add(key)
        host = url.split('//')[1].split('/')[0] if '://' in url else '?'
        title = bonus_titles[i].strip() if i < len(bonus_titles) else ''
        print('  B%d [%s] %s' % (i+1, host, title[:80]))
        print('       %s' % url)
except Exception as e:
    print('  BONUS SEARCH FAILED: %s' % str(e)[:120])
