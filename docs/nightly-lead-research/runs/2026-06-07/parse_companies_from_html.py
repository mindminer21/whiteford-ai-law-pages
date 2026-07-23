#!/usr/bin/env python3
"""Parse company HTML files saved from earlier research into structured data."""
import json, re, os, html as html_mod

def parse_company_html(filepath, company_name):
    """Extract key info from a saved company HTML file."""
    with open(filepath, 'r', errors='replace') as f:
        text = f.read()
    
    # Clean HTML to text
    clean = re.sub(r'<script[^>]*>.*?</script>', '', text, flags=re.DOTALL)
    clean = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL)
    clean = re.sub(r'<[^>]+>', ' ', clean)
    clean = html_mod.unescape(clean)
    clean = re.sub(r'\s+', ' ', clean).strip()
    
    result = {
        'name': company_name,
        'clean_text_length': len(clean),
        'preview': clean[:2000],
        'entities': [],
        'funding': [],
        'people': [],
        'locations': [],
    }
    
    # Look for funding amounts
    for m in re.finditer(r'(\$[\d.]+(?:\.\d+)?\s*(?:M|B))', clean):
        result['funding'].append(m.group(1))
    
    # Look for people names (capitalized pairs/triples not in known non-names)
    non_words = {'Welcome to', 'We are', 'Our team', 'Meet the', 'Our Mission', 'Our Values',
                'Our Vision', 'Our Story', 'Our Work', 'Our Clients', 'Our Process',
                'About Us', 'Contact Us', 'Press Center', 'Media Kit', 'Careers at',
                'Cookie Policy', 'Privacy Policy', 'Terms of Use', 'Privacy & Legal',
                'All Rights Reserved', 'Sign In', 'Log In', 'Get Started', 'Start Free',
                'Free Trial', 'Request Demo', 'Schedule Demo', 'Book a Call',
                'Contact Sales', 'Learn More', 'View All', 'Next Page'}
    people = re.findall(r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})', clean)
    for p in people:
        if p not in non_words and len(p) > 4 and len(p) < 60:
            result['people'].append(p)
    
    # Look for locations
    locations = re.findall(r'\b(Austin|Boston|Denver|Boulder|Miami|Oakland|SF|San Francisco|Seattle|Portland|NYC|New York|Los Angeles|LA|Chicago|Atlanta|Nashville|Austin|Toronto|London|Berlin|Tel Aviv)\b', clean)
    result['locations'] = list(set(locations))
    
    return result

# Parse all company HTML files
results = {}
company_files = sorted([f for f in os.listdir('/tmp') if f.startswith('company_') and f.endswith('.html')])

for cf in company_files:
    name = cf.replace('company_', '').replace('.html', '')
    filepath = os.path.join('/tmp', cf)
    if os.path.exists(filepath):
        parsed = parse_company_html(filepath, name)
        results[name] = parsed
        print(f"\n{'='*60}")
        print(f"Company: {parsed['name']}")
        print(f"Text length: {parsed['clean_text_length']:,}")
        print(f"Funding mentions: {parsed['funding']}")
        print(f"Locations: {parsed['locations']}")
        print(f"People (first 5): {parsed['people'][:5]}")
        print(f"Preview: {parsed['preview'][:500]}")

# Save
with open('/tmp/parsed_companies.json', 'w') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"\n\n[SAVED] /tmp/parsed_companies.json")
print(f"Total companies parsed: {len(results)}")
