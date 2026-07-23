#!/usr/bin/env python3
"""Verify candidate prospects: fetch homepages, about/team pages, extract leadership and facts."""
import urllib.request, ssl, re, json, sys

ctx = ssl.create_default_context()

def fetch(url, timeout=10):
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            'Accept': 'text/html',
        })
        resp = urllib.request.urlopen(req, context=ctx, timeout=timeout)
        code = resp.getcode()
        text = resp.read().decode('utf-8', errors='replace')
        return code, text
    except Exception as e:
        return 0, str(e)

def clean_text(html):
    text = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL)
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text

# Candidates to verify
candidates = [
    {
        'name': 'Harmonic Inc',
        'domain': 'harmonic.ai',
        'urls': [
            'https://www.harmonic.ai/',
            'https://www.harmonic.ai/about',
            'https://www.harmonic.ai/team',
            'https://www.harmonic.ai/blog/harvey-raises-series-d',
        ],
        'known_fact': '$100M Series B for mathematical superintelligence',
        'press_url': 'https://www.businesswire.com/news/home/20250710118878/en/Harmonic-Raises-%24100-Million-Series-B-to-Accelerate-Development-of-Mathematical-Superintelligence',
    },
    {
        'name': 'SandboxAQ',
        'domain': 'sandboxaq.com',
        'urls': [
            'https://www.sandboxaq.com/',
            'https://www.sandboxaq.com/about',
            'https://www.sandboxaq.com/press',
            'https://www.sandboxaq.com/press/sandboxaq-closes-450m-series-e-round-with-expanded-investor-base',
        ],
        'known_fact': '$450M Series E, expanded investor base',
        'press_url': 'https://www.sandboxaq.com/press/sandboxaq-closes-450m-series-e-round-with-expanded-investor-base',
    },
    {
        'name': '7AI (Seven AI)',
        'domain': '7ai.com',
        'urls': [
            'https://blog.7ai.com/',
            'https://blog.7ai.com/citing-the-agentic-security-inflection-point-7ai-raises-largest-cybersecurity-a-round-in-history-to-bring-ai-security-agents-to-enterprises',
            'https://7ai.com/',
        ],
        'known_fact': '$300M+ AI cybersecurity security agents',
        'press_url': 'https://blog.7ai.com/citing-the-agentic-security-inflection-point-7ai-raises-largest-cybersecurity-a-round-in-history-to-bring-ai-security-agents-to-enterprises',
    },
    {
        'name': 'Celestial AI', 
        'domain': 'celestial.ai',
        'urls': [
            'https://www.celestial.ai/',
            'https://www.celestial.ai/blog/celestial-ai-secures-250-million-funding-to-revolutionize-ai-infrastructure-with-its-photonic-fabric',
        ],
        'known_fact': '$250M funding for photonic AI fabric',
        'press_url': 'https://www.celestial.ai/blog/celestial-ai-secures-250-million-funding-to-revolutionize-ai-infrastructure-with-its-photonic-fabric',
    },
    {
        'name': 'Elise AI',
        'domain': 'elise.ai',
        'urls': [
            'https://www.eliseai.com/',
            'https://www.eliseai.com/blog/eliseai-raises-250m-series-e',
        ],
        'known_fact': '$250M Series E',
        'press_url': 'https://www.eliseai.com/blog/eliseai-raises-250m-series-e',
    },
]

prospect_data = {}

for cand in candidates:
    print('\n=== %s (%s) ===' % (cand['name'], cand['domain']))
    prospect_data[cand['name']] = {
        'domain': cand['domain'],
        'known_fact': cand['known_fact'],
        'known_funding': False,
        'press_url': cand['press_url'],
        'pages': {},
        'leadership': [],
        'product': '',
        'tech_focus': '',
    }
    
    for url in cand['urls']:
        code, text = fetch(url)
        key = 'homepage' if 'about' not in url and 'team' not in url and 'blog' not in url and 'press' not in url and 'raise' not in url and 'funding' not in url else url.split('/')[-1].split('.')[0][:20]
        
        if code == 200:
            preview = clean_text(text)[:300]
            prospect_data[cand['name']]['pages'][url[:60]] = {'status': code, 'preview': preview}
            
            # Extract company name from title
            title_m = re.search(r'<title>([^<]+)</title>', text)
            title = title_m.group(1) if title_m else 'N/A'
            print('  URL: %s [HTTP %d] Title: %s' % (url[:70], code, title[:60]))
            
            # Extract text content
            text = clean_text(text)
            # Try to find company description
            desc_m = re.search(r'(?:about|overview|introduction|who we are|product|mission)[:.\]]*\s*([^\.]{50,500})', text, re.IGNORECASE)
            if desc_m:
                prospect_data[cand['name']]['product'] = desc_m.group(1)[:200]
                prospect_data[cand['name']]['tech_focus'] = desc_m.group(1)[:200]
                print('   DESCRIPTION: %s' % desc_m.group(1)[:200])
            
            # Look for funding announcements
            funding_m = re.search(r'raise(d|s)?\s+(?:\$?\d+\.?\d*M?\.?\d*B)', text, re.IGNORECASE)
            if funding_m:
                prospect_data[cand['name']]['known_funding'] = True
                print('   FUNDING: %s' % funding_m.group(0)[:100])
            
            # Look for leadership names + titles
            for lm in re.finditer(r'([A-Z][a-z]+\s+[A-Z][a-z]+).*(?:CTO|CEO|Founder|Chief|VP|Head of)', text, re.IGNORECASE):
                prospect_data[cand['name']]['leadership'].append(lm.group(1)[:80])
            
            # Look for investor names
            investor_m = re.search(r'(?:led by|investors|invested by|participants|backed by)\s+([^\.]{30,300})', text, re.IGNORECASE)
            if investor_m:
                print('   INVESTORS: %s' % investor_m.group(1)[:150])
        else:
            print('  URL: %s [FAILED] %s' % (url[:70], text[:100]))
    
    # If we didn't find funding in the fetched page, the known funding from DDG/TC is still evidence
    if not prospect_data[cand['name']]['known_funding']:
        print('   KNOWN FROM OTHER SOURCE: %s' % prospect_data[cand['name']]['known_fact'])
    
    if prospect_data[cand['name']]['leadership']:
        print('   LEADERSHIP: %s' % str(prospect_data[cand['name']]['leadership'])[:200])

print('\n\n[PROSPECT_DATA SUMMARY]')
print(json.dumps(prospect_data, indent=2, ensure_ascii=False)[:3000])
