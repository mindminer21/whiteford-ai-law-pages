import json, re, os

# 1. Load DDG search results saved from earlier in this session
ddg_file = '/tmp/ddg_2026-06-07.html'
if os.path.exists(ddg_file):
    with open(ddg_file, 'r') as f:
        ddg_html = f.read()
    print(f"DDG HTML file exists: {len(ddg_html)} chars")
    
    # Try to parse DDG results - DDG puts results in structured format
    # Look for result URLs that are companies (not search engine pages)
    urls = re.findall(r'href="([^"]*://[^"]*)"', ddg_html)
    print(f"Found {len(urls)} hrefs in DDG results")
    
    # Filter to likely company pages (not google, bing, duckduckgo, etc.)
    company_urls = []
    for u in urls:
        if u.startswith('http') and 'duckduckgo' not in u and 'google' not in u and 'bing' not in u and 'wikipedia' not in u:
            if 'search' not in u and 'results' not in u:
                company_urls.append(u)
    print(f"Company URLs: {len(company_urls)}")
    for u in company_urls[:20]:
        print(f"  {u[:100]}")

# 2. Load TC article
tc_file = '/tmp/tc_100m_ai_2025.html'
if os.path.exists(tc_file):
    with open(tc_file, 'r') as f:
        tc_html = f.read()
    print(f"\nTC article: {len(tc_html)} chars")
    
    # Find company mentions in TC article
    fundings = re.findall(r'([^,\.]{4,60})\s+(?:raised|raise(s)?|closes?)\s+(?:\$?\s*(\d+\.?\d*)\s*(M|B))', tc_html)
    funding_info = []
    for name, action, amount, unit in fundings:
        funding_info.append((name.strip(), f"${amount}{unit}"))
        print(f"  Funding: {name.strip()} - ${amount}{unit}")

# 3. Load topstartups data
ts_file = '/tmp/topstartups_ai.html'
if os.path.exists(ts_file):
    with open(ts_file, 'r') as f:
        ts_html = f.read()
    print(f"\nTopstartups.io: {len(ts_html)} chars")

# 4. Load company HTMLs (existing research)
company_files = [f for f in os.listdir('/tmp') if f.startswith('company_') and f.endswith('.html')]
print(f"\n{len(company_files)} company research files in /tmp:")
for cf in sorted(company_files[:20]):
    size = os.path.getsize(os.path.join('/tmp', cf))
    print(f"  {cf} ({size:,} chars)")

# 5. Try to load the parse_ddg_v2 results
parse_file = '/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-07/parse_ddg_v2.py'
if os.path.exists(parse_file):
    print(f"\nparse_ddg_v2.py exists: {os.path.getsize(parse_file)} bytes")
