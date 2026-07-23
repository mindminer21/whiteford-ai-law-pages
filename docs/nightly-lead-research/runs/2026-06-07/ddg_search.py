#!/usr/bin/env python3
"""DDG search via HTML endpoint + company page extraction for prospect research."""
import urllib.request, ssl, re, json, sys, os

ctx = ssl.create_default_context()
headers = {'User-Agent': 'prospect-research/1.0 (educational research, compliance review)'}

def ddg_search(query):
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(query)
    req = urllib.request.Request(url, headers=headers)
    html = urllib.request.urlopen(req, context=ctx, timeout=15).read().decode('utf-8')
    results = []
    for m in re.finditer(r'<a class="result__a" href="(https?://[^"]+)"[^>]*>([^<]+)</a>', html):
        href, title = m.group(1), m.group(2)
        if href and 'duckduckgo' not in href:
            results.append({'title': title.strip(), 'url': href, 'snippet': ''})
    for m in re.finditer(r'<a class="result__snippet"[^>]*>([^<]+)</a>', html):
        if results:
            results[-1]['snippet'] = m.group(1).strip()
    return results[:15]

def extract_company_page(url):
    """Extract text content from a company/product page."""
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'prospect-research/1.0'})
        page = urllib.request.urlopen(req, context=ctx, timeout=15).read().decode('utf-8', errors='replace')
        # Strip HTML tags
        text = re.sub(r'<script[^>]*>.*?</script>', '', page, flags=re.DOTALL)
        text = re.sub(r'<style[^>]*>.*?</style>', '', page, flags=re.DOTALL)
        text = re.sub(r'<[^>]+>', ' ', text)
        text = re.sub(r'\s+', ' ', text)
        return text[:3000]
    except Exception as e:
        return f'EXTRACT_ERROR: {e}'

# Search themes
queries = [
    'AI machine learning startup funding 2025 2026 CTO',
    'SaaS technology company enterprise sales funding announcement 2026',
    'company deploying AI governance compliance hiring 2025 2026',
    'tech startup product launch funding round 2026',
]

all_results = []
for q in queries:
    try:
        results = ddg_search(q)
        all_results.extend(results)
        print(f'[QUERY] {q} => {len(results)} results', file=sys.stderr)
    except Exception as e:
        print(f'[ERROR] {q}: {e}', file=sys.stderr)

# Deduplicate by normalized URL
seen = set()
unique = []
for r in all_results:
    key = r['url'].split('#')[0].split('?')[0]
    if key not in seen:
        seen.add(key)
        unique.append(r)

print(f'[TOTAL_UNIQUE] {len(unique)}', file=sys.stderr)
# Print top candidates (skip known non-prospect sources)
for r in unique:
    host = r['url'].split('//')[1].split('/')[0]
    if any(skip in host.lower() for skip in ['duckduckgo', 'wikipedia', 'reddit.com', 'quora.com', 'medium.com']):
        continue
    print(f'PROSPECT_CANDIDATE | {r["title"][:100]} | {r["url"]}')
    if r['snippet']:
        print(f'  SNIPPET: {r["snippet"][:200]}')
    # Also show the domain extracted
    print(f'  DOMAIN: {host}')
