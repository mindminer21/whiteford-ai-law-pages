#!/usr/bin/env python3
"""Live URL extraction for 3 prospect candidates — Nightly Run 2026-06-07"""
import urllib.request, ssl, re, json, sys

ctx = ssl.create_default_context()

PROSPECTS = {
    "SandboxAQ": {
        "domain": "sandboxaq.com",
        "base_url": "https://www.sandboxaq.com",
        "known_funding": "$450M Series E",
        "known_source": "https://www.sandboxaq.com/press/sandboxaq-closes-450m-series-e-round-with-expanded-investor-base",
        "focus": "quantum + AI / LQMs / drug discovery / material discovery",
    },
    "Harvey": {
        "domain": "harvey.ai",
        "base_url": "https://www.harvey.ai",
        "known_funding": "$300M Series D",
        "known_source": "https://www.harvey.ai/blog/harvey-raises-series-d",
        "focus": "AI legal research assistant for law firms",
    },
    "EliseAI": {
        "domain": "eliseai.com",
        "base_url": "https://www.eliseai.com",
        "known_funding": "$250M Series E",
        "known_source": "https://www.eliseai.com/blog/eliseai-raises-250m-series-e",
        "focus": "AI for housing/healthcare (leasing, resident operations)",
    },
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
}

results = {}

for name, info in PROSPECTS.items():
    print(f"\n{'='*60}")
    print(f"=== RESEARCHING: {name} ({info['domain']}) ===")
    print(f"{'='*60}")
    
    pages = {}
    url_sets = {
        'home': info['base_url'] + '/',
        'about': info['base_url'] + '/about',
        'company': info['base_url'] + '/company',
        'investors': info['base_url'] + '/investors',
        'team': info['base_url'] + '/team',
        'leadership': info['base_url'] + '/leadership',
        'press': info['base_url'] + '/press',
        'careers': info['base_url'] + '/careers',
        'technology': info['base_url'] + '/technology',
        'products': info['base_url'] + '/products',
    }
    
    for page_name, url in url_sets.items():
        try:
            req = urllib.request.Request(url, headers=headers)
            resp = urllib.request.urlopen(req, context=ctx, timeout=15)
            code = resp.getcode()
            text = resp.read().decode('utf-8', errors='replace')[:5000]
            
            title_m = re.search(r'<title>([^<]+)</title>', text)
            title = title_m.group(1).strip()[:80] if title_m else '(no title)'
            
            # Check for body text (not just cookie notices)
            body_text = re.sub(r'<[^>]+>', ' ', text)
            body_text = re.sub(r'\s+', ' ', body_text).strip()[:500]
            
            pages[page_name] = {
                'url': url,
                'status': code,
                'title': title,
                'body_snippet': body_text[:200],
            }
            print(f"  [{page_name}] HTTP {code}: {title[:60]}")
            
        except urllib.error.HTTPError as e:
            pages[page_name] = {'url': url, 'status': e.code, 'title': 'HTTP Error', 'body_snippet': ''}
        except urllib.error.URLError as e:
            pages[page_name] = {'url': url, 'status': 'ERROR', 'title': str(e.reason)[:50], 'body_snippet': ''}
        except Exception as e:
            pages[page_name] = {'url': url, 'status': 'ERROR', 'title': str(e)[:50], 'body_snippet': ''}
    
    # Extract leadership/people from available pages
    leadership = []
    emails = []
    
    for page_name, pdata in pages.items():
        if pdata.get('status') != 200 or not pdata.get('body_snippet'):
            continue
        text = pdata['body_snippet']
        
        if page_name in ('about', 'company', 'team', 'leadership', 'careers'):
            names = re.findall(r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})', text)
            non_names = {'Welcome to', 'We would', 'Our team', 'Meet the', 'Our Mission', 'Our Values',
                        'Our Vision', 'Our Story', 'Our Work', 'Our Clients', 'Our Process',
                        'About Us', 'Contact Us', 'Press Center', 'Media Kit', 'Careers at',
                        'Cookie Policy', 'Privacy Policy', 'Terms of Use'}
            for n in names:
                if n not in non_names and len(n) > 4 and len(n) < 50:
                    if n not in leadership:
                        leadership.append(n)
        
        found_emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text)
        for e in found_emails:
            if e not in emails and 'no-reply' not in e and 'postmaster' not in e:
                emails.append(e)
    
    results[name] = {
        'domain': info['domain'],
        'base_url': info['base_url'],
        'known_funding': info['known_funding'],
        'known_source': info['known_source'],
        'known_focus': info['focus'],
        'pages': pages,
        'leadership': leadership[:5],
        'emails': emails[:3],
    }

with open('/tmp/prospect_research_2026-06-07.json', 'w') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print("\n\n[SAVED] /tmp/prospect_research_2026-06-07.json")
print(f"Total prospects researched: {len(results)}")
