#!/usr/bin/env python3
"""Extract company names and funding details from the saved TechCrunch $100M+ AI startups list."""
import re, urllib.request, ssl

ctx = ssl.create_default_context()

with open('/tmp/tc_100m_ai_2025.html', 'r', errors='replace') as f:
    html = f.read()

# Find all company funding mentions - look for patterns like "Company X raises $Y"
# TC articles list companies as section titles or links
companies = []

# Pattern 1: links that look like company funding announcements
for m in re.finditer(r'href="(https?://[^"]*raise[^"]*)"[^>]*>([^<]+)</a>', html, re.DOTALL):
    url, title = m.group(1), m.group(2).strip()
    if title and len(title) > 3 and len(title) < 80:
        companies.append({'url': url, 'title': title, 'snippet': ''})

# Pattern 2: Find all h2/h3 that are company names
for m in re.finditer(r'<h[123][^>]*>([^<]{4,60})</h[123]>', html, re.DOTALL):
    name = m.group(1).strip()
    if name and re.match(r"^[A-Z][\w'&(.-]*$", name):
        companies.append({'title': name, 'url': '', 'snippet': 'heading_mention'})

# Also look for "at valuation" patterns that include company names and funding amounts
funding_patterns = re.findall(r'([^,\.]{4,60}) raises \$(\d+(?:\.\d+)?(?:M|B))', html, re.IGNORECASE)
for name, amount in funding_patterns:
    companies.append({'title': name.strip(), 'url': '', 'snippet': 'raised_%s' % amount})

# Deduplicate
seen = set()
unique = []
for c in companies:
    key = c.get('title', '').lower()
    if key and key not in seen and len(key) > 3:
        seen.add(key)
        unique.append(c)

# Also try the TC article body for structured company entries
# TC often has format: "Company Name (company.com) - Description"
section_pattern = re.findall(r'href="([^"]*company/[^"]*)"[^>]*>([^<]+)</a>', html, re.DOTALL)

print('=== COMPANIES FOUND FROM TC ARTICLE ===')
for i, c in enumerate(unique[:60]):
    print('%d. %s [url=%s] [%s]' % (i+1, c['title'][:60], c.get('url', 'N/A')[:50], 'funding_mention' if 'raised_' in str(c.get('snippet','')) else ''))

print('\n=== FUNDING DETAILS ===')
for name, amount in funding_patterns:
    print('  %s raised $%s' % (name.strip(), amount))

print('\n=== COMPANY PAGES ===')
for url, name in section_pattern[:30]:
    if 'techcrunch' not in url:
        print('  %s -> %s' % (name.strip()[:60], url[:80]))

# Now let's verify the best candidates: fetch a few
best_candidates = [
    'https://www.sandboxaq.com/press/sandboxaq-closes-450m-series-e',
    'https://www.businesswire.com/news/home/20250710118878/en/Harmonic-Raises-%24100-Million-Series-B-to-Accelerate-Development-of-Mathematical-Superintelligence',
    'https://blog.7ai.com/citing-the-agentic-security-inflection-point-7ai-raises-largest-cybersecurity-a-round-in-history-to-bring-ai-security-agents-to-enterprises',
    'https://www.celestial.ai/blog/celestial-ai-secures-250-million-funding-to-revolutionize-ai-infrastructure-with-its-photonic-fabric',
    'https://www.eliseai.com/blog/eliseai-raises-250m-series-e',
    'https://www.harvey.ai/blog/harvey-raises-series-d',
    'https://reka.ai/news/reka-secures-110-million-to-accelerate-adoption-of-its-multimodal-ai-platforms',
    'https://fireworks.ai/blog/series-c',
]

print('\n=== VERIFYING BEST CANDIDATES ===')
results = {}
for url in best_candidates:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'})
        resp = urllib.request.urlopen(req, context=ctx, timeout=15)
        code = resp.getcode()
        text = resp.read().decode('utf-8', errors='replace')[:3000]
        # Clean
        clean = re.sub(r'<[^>]+>', ' ', text)
        clean = re.sub(r'\s+', ' ', clean).strip()
        title_m = re.search(r'<title>([^<]+)</title>', text)
        title = title_m.group(1)[:80] if title_m else 'N/A'
        
        # Extract funding info
        fund_m = re.search(r'raise(d|s)?\s+(?:\$?\s*(\d+\.?\d*)\s*(M|B))', clean, re.IGNORECASE)
        funding = fund_m.group(0)[:100] if fund_m else 'n/a'
        
        # Find CEO/leader
        leader_m = re.search(r'(?:CEO|CTO|Founder|Chief|CEO and).*?([^\.]{20,200})', clean, re.IGNORECASE)
        leader = leader_m.group(1)[:100] if leader_m else ''
        
        # Find investor
        investor_m = re.search(r'(?:led by|investors|backed by|participants)\s+([^\.]{30,300})', clean, re.IGNORECASE)
        investor = investor_m.group(1)[:100] if investor_m else ''
        
        # Extract company name from title
        company_name = re.sub(r'\s*-\s.*', '', title).strip()[:60]
        
        results[url.split('/')[3]] = {
            'url': url,
            'status': code,
            'title': company_name,
            'funding': funding,
            'leader': leader[:80] if leader else '',
            'investor': investor[:80] if investor else '',
            'clean_preview': clean[:300],
        }
        print('  [OK HTTP %d] %s | %s | %s' % (code, company_name[:30], funding[:30], investor[:30]))
    except Exception as e:
        host = url.split('/')[3]
        print('  [FAIL] %s: %s' % (host, str(e)[:80]))

# Save results for later processing
import json
with open('/tmp/verify_results.json', 'w') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)
print('\n[SAVED] verify_results.json')
