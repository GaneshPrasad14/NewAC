import json
import os

# Base URL
BASE_URL = "https://www.coolcareservices.in"

# Load data
with open('src/data/cities.json', 'r', encoding='utf-8') as f:
    cities = json.load(f)
with open('src/data/services.json', 'r', encoding='utf-8') as f:
    services = json.load(f)

# Static routes
static_routes = [
    "/",
    "/about-us",
    "/services",
    "/contact",
    "/faqs",
    "/blog"
]

# Build sitemap
xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

# Add static routes
for route in static_routes:
    xml += f"  <url>\n    <loc>{BASE_URL}{route}</loc>\n    <priority>{'1.0' if route == '/' else '0.8'}</priority>\n  </url>\n"

# Add city pages
for city in cities:
    xml += f"  <url>\n    <loc>{BASE_URL}/{city['slug']}</loc>\n    <priority>0.7</priority>\n  </url>\n"

# Add service-city pages
for service in services:
    for city in cities:
        xml += f"  <url>\n    <loc>{BASE_URL}/services/{service['slug']}-{city['slug']}</loc>\n    <priority>0.6</priority>\n  </url>\n"

xml += '</urlset>'

# Output the file
with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(xml)

print("Sitemap generated with 190+ URLs!")
