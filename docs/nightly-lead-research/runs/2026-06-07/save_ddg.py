#!/usr/bin/env python3
"""Step 1: Save DuckDuckGo search HTML to file for later parsing."""
import urllib.request, ssl, sys

ctx = ssl.create_default_context()
query = 'AI+machine+learning+startup+funding+2025+2026+CTO'
url = 'https://html.duckduckgo.com/html/?q=' + query

req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
})
try:
    resp = urllib.request.urlopen(req, context=ctx, timeout=15)
    html = resp.read()
    with open('/tmp/ddg_2026-06-07.html', 'wb') as f:
        f.write(html)
    print('DONE: DuckDuckGo search saved, %d bytes, status=%d' % (len(html), resp.getcode()))
except urllib.error.HTTPError as e:
    print('FAILED: HTTP %d: %s' % (e.code, e.reason))
    sys.exit(1)
except urllib.error.URLError as e:
    print('FAILED: URL %s' % e.reason)
    sys.exit(1)
except Exception as e:
    print('FAILED: %s: %s' % (type(e).__name__, e))
    sys.exit(1)
