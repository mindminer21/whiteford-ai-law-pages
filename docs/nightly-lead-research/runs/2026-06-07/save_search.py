#!/usr/bin/env python3
"""Step 1: Save DuckDuckGo and Google search HTML to files for later parsing."""
import urllib.request, ssl, sys, os

ctx = ssl.create_default_context()

def save_search(query, base_url, output_path, label):
    """Save search results HTML to file."""
    url = base_url + 'q=' + urllib.request.quote(query)
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
    })
    try:
        resp = urllib.request.urlopen(req, context=ctx, timeout=15)
        html = resp.read()
        with open(output_path, 'wb') as f:
            f.write(html)
        print(f'DONE: {label} => {output_path} ({len(html)} bytes, status={resp.getcode()})')
    except urllib.error.HTTPError as e:
        print(f'FAIL: {label} => HTTP {e.code}: {e.reason}')
    except urllib.error.URLError as e:
        print(f'FAIL: {label} => URL {e.reason}')
    except Exception as e:
        print(f'FAIL: {label} => {type(e).__name__}: {e}')

queries = [
    ('AI+machine+learning+startup+funding+2025+2026+CTO+propositional'),
    ('technology+company+Series+B+enterprise+sales+product+launch+2026'),
]

for query, label in zip(queries, ['DDG-1', 'DDG-2']):
    save_search(query['replace('+', '%2B')], 'https://html.duckduckgo.com/html/?q=', f'/tmp/ddg_{label}.html', label)

print('Files saved. Run extract_ddg.py next.')
