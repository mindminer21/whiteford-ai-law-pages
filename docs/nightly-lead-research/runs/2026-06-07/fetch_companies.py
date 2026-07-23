#!/usr/bin/env python3
"""Fetch a list of company URLs and extract key text from each for prospect qualification."""
import urllib.request, ssl, re, sys, os

ctx = ssl.create_default_context()

def fetch_page(url, timeout=12):
    """Fetch URL, return (status_code, text) or (0, error_msg)."""
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
        resp = urllib.request.urlopen(req, context=ctx, timeout=timeout)
        code = resp.getcode()
        text = resp.read().decode('utf-8', errors='replace')
        return code, text
    except Exception as e:
        return 0, str(e)

# List of candidate companies to verify - these are real companies I'm checking via their websites
# I'll verify each one for legitimacy and lead-magnet fit
candidates = [
    {
        'name_check': 'Kodiak Robotics',
        'urls': [
            'https://kodiak.ai/',
            'https://kodiak.ai/company',
            'https://kodiak.ai/technology',
        ]
    },
    {
        'name_check': 'Rigetti Computing',
        'urls': [
            'https://www.rigetti.com/',
            'https://www.rigetti.com/about',
        ]
    },
    {
        'name_check': 'Scale AI',
        'urls': [
            'https://scale.com/',
            'https://www.scale.com/company',
        ]
    },
]

for c in candidates:
    print(f'\n[COMPANY] {c["name_check"]}')
    for url in c['urls']:
        code, text = fetch_page(url)
        if code == 200:
            # Extract meaningful text (strip HTML)
            text = re.sub(r'<script[^>]*>.*?</script>', '', text, flags=re.DOTALL)
            text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL)
            text = re.sub(r'<[^>]+>', ' ', text)
            text = re.sub(r'\s+', ' ', text).strip()
            title_match = re.search(r'<title>([^<]+)</title>', text)
            title = title_match.group(1) if title_match else 'No title'[:80]
            # First meaningful sentence
            sentences = [s.strip() for s in text.split('.')][0:2]
            print(f'  URL: {url}')
            print(f'  Status: {code} | Title: {title[:80]}')
            print(f'  Preview: {sentences[0][:200]} ...')
        else:
            print(f'  URL: {url} | Status: FAILED - {text[:100]}')
