import os
import re
import json

directory = r"c:\Users\Renato\Documents\cerradofinancas"
output_file = r"C:\Users\Renato\AppData\Local\Temp\analysis.json"

results = []

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            
            # Extract title
            title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
            title = title_match.group(1).strip() if title_match else "No title"
            
            # Extract description
            desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']*)["\']', content, re.IGNORECASE)
            description = desc_match.group(1).strip() if desc_match else "No description"
            
            # Extract h1
            h1_matches = re.findall(r'<h1.*?>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
            h1s = [re.sub(r'<[^>]+>', '', h1).strip() for h1 in h1_matches]
            
            # Extract h2 (often used for sections)
            h2_matches = re.findall(r'<h2.*?>(.*?)</h2>', content, re.IGNORECASE | re.DOTALL)
            h2s = [re.sub(r'<[^>]+>', '', h2).strip() for h2 in h2_matches]
            
            results.append({
                "filename": filename,
                "title": title,
                "description": description,
                "h1": h1s,
                "h2": h2s[:5]  # Limit to first 5 h2s to keep it concise
            })

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"Analysis saved to {output_file}")
