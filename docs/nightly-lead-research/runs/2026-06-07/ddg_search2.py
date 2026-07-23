#!/usr/bin/env python3
"""Alternative search via Google HTML + direct company site fetching for prospect research."""
import urllib.request, ssl, re, json, sys

ctx = ssl.create_default_context()
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}

def google_search(query):
    """Search via Google HTML results."""
    url = 'https://www.google.com/search?q=' + urllib.parse.quote(query) + '&num=10'
    req = urllib.request.Request(url, headers=headers)
    try:
        page = urllib.request.urlopen(req, context=ctx, timeout=15).read().decode('utf-8', errors='replace')
        results = []
        for m in re.finditer(r'<a data-ved=.*?href=(https?://[^"&]+)', page):
            href = m.group(1)
            results.append(href)
        return results[:8]
    except Exception as e:
        print(f'[GGS_ERROR] {e}', file=sys.stderr)
        return []

def bing_search(query):
    """Search via Bing HTML results."""
    url = 'https://www.bing.com/search?q=' + urllib.parse.quote(query)
    req = urllib.request.Request(url, headers=headers)
    try:
        page = urllib.request.urlopen(req, context=ctx, timeout=15).read().decode('utf-8', errors='replace')
        results = []
        for m in re.finditer(r'<li class="b_algo"><h2><a href="(https?://[^"]+)"[^>]*>([^<]+)</a>', page):
            href, title = m.group(1), m.group(2).strip()
            if href and 'bing.com' not in href and 'microsoft' not in href:
                results.append({'url': href, 'title': title})
        return results[:8]
    except Exception as e:
        print(f'[BING_ERROR] {e}', file=sys.stderr)
        return []

def fetch_with_timeout(url, timeout=12):
    """Fetch and return status + first 2000 chars."""
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'})
        resp = urllib.request.urlopen(req, context=ctx, timeout=timeout)
        return resp.getcode(), resp.read().decode('utf-8', errors='replace')[:2000]
    except Exception as e:
        return 0, f'ERROR: {e}'

# Try Google search
print('[TESTING GOOGLE SEARCH...]', file=sys.stderr)
g_results = google_search('AI startup Series B funding 2025')
print(f'[GOOGLE_RESULTS] {len(g_results)}', file=sys.stderr)
for r in g_results[:5]:
    print(f'  G: {r}', file=sys.stderr)

# Try Bing search
print('[TESTING BING SEARCH...]', file=sys.stderr)
b_results = bing_search('AI startup Series B funding 2025 2026')
print(f'[BING_RESULTS] {len(b_results)}', file=sys.stderr)
for r in b_results[:5]:
    print(f'  B: {r["title"][:80]} | {r["url"]}', file=sys.stderr)

# Also try DuckDuckGo gohtml endpoint
print('[TESTING DDG HTML2...]', file=sys.stderr)
try:
    url = 'https://duckduckgo.com/html/?q=' + urllib.parse.quote('AI startup funding CTO product launch 2025')
    req = urllib.request.Request(url, headers=headers)
    page = urllib.request.urlopen(req, context=ctx, timeout=15).read().decode('utf-8', errors='replace')
    links = re.findall(r'<a class="result__a" href="(https?://[^"]+)"', page)
    titles = re.findall(r'<a class="result__a"[^>]*>([^<]+)</a>', page)
    snippets = re.findall(r'result__snippet[^>]*>([^<]+)</a>', page)
    for i in range(min(len(links), len(titles), 8)):
        print(f'  D: {titles[i][:80]} | {links[i]}', file=sys.stderr)
        if i < len(snippets):
            print(f'     {snippets[i][:150]}', file=sys.stderr)
except Exception as e:
    print(f'[DDG2_ERROR] {e}', file=sys.stderr)
