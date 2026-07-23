#!/usr/bin/env python3
"""Extract company links from DuckDuckGo HTML, Google HTML, and Bing HTML saved files."""
import re, sys, os

def extract_from_file(filepath):
    results = []
    if not os.path.exists(filepath):
        print(f'File not found: {filepath}', file=sys.stderr)
        return results
    with open(filepath, 'r', errors='replace') as f:
        html = f.read()
    print(f'Input: {os.path.basename(filepath)} | len={len(html)}', file=sys.stderr)
    
    # DuckDuckGo HTML pattern
    for m in re.finditer(r'<a class="result__a" href="(https?://[^"]+)"[^>]*>([^<]+)</a>', html):
        href, title = m.group(1), m.group(2).strip()
        if href and 'duckduckgo' not in href and 'ddg' not in href:
            results.append({'title': title, 'url': href})
    if not results:
        # Google pattern
        for m in re.finditer(r'<a data-ved=.*?href=(https?://[^"&]+)', html):
            results.append({'title': 'Google', 'url': m.group(1)})
        if not results:
            # Bing pattern
            for m in re.finditer(r'<li class="b_algo"><h2><a href="(https?://[^"]+)"[^>]*>([^<]+)</a>', html):
                href, title = m.group(1), m.group(2).strip()
                # already handled above
    
    return results

ddg_file = sys.argv[1] if len(sys.argv) > 1 else '/tmp/ddg_results.html'
results = extract_from_file(ddg_file)
print(f'[FOUND] {len(results)} results from {ddg_file}', file=sys.stderr)
for r in results[:20]:
    host = r['url'].split('//')[1].split('/')[0] if '://' in r['url'] else '???'
    print(f'PROSPECT | {r["title"][:100]} | {r["url"]}')
