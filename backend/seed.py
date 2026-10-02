"""Seed the database with 20 realistic sneaker products.

Usage:
    python seed.py
"""
import os
import sys
from decimal import Decimal

import django

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from products.models import Product  # noqa: E402


def unsplash(photo_id, w=800):
    return f'https://images.unsplash.com/photo-{photo_id}?auto=format&fit=crop&w={w}&q=80'


PRODUCTS = [
    {
        'name': 'Aero Pulse X3',
        'brand': 'Nova',
        'category': 'running',
        'price': '149.00',
        'compare_at_price': '189.00',
        'photo': '1542291026-7eec264c27ff',
        'is_featured': True,
        'rating': '4.8', 'reviews': 1248,
        'description': 'Our lightest performance runner yet. The Aero Pulse X3 combines a '
                       'carbon-infused midsole with an airy engineered-knit upper for '
                       'effortless miles.',
    },
    {
        'name': 'Shadow Court Mid',
        'brand': 'Nova',
        'category': 'basketball',
        'price': '179.00',
        'compare_at_price': None,
        'photo': '1600185365483-26d7a4cc7519',
        'is_featured': True,
        'rating': '4.7', 'reviews': 842,
        'description': 'Lock-in ankle support meets a responsive bounce foam. Dominates the '
                       'paint, looks sharp off it.',
    },
    {
        'name': 'Solar Flash 90',
        'brand': 'Vektor',
        'category': 'lifestyle',
        'price': '119.00',
        'compare_at_price': '149.00',
        'photo': '1600269452121-4f2416e55c28',
        'is_featured': False,
        'rating': '4.6', 'reviews': 512,
        'description': 'Retro silhouette, modern comfort. The Solar Flash 90 brings sun-washed '
                       'colorways to your everyday rotation.',
    },
    {
        'name': 'Cloudline Classic',
        'brand': 'Allbird',
        'category': 'casual',
        'price': '89.00',
        'compare_at_price': None,
        'photo': '1552346154-21d32810aba3',
        'is_featured': True,
        'rating': '4.9', 'reviews': 3120,
        'description': 'A quiet classic. Soft merino lining, recycled laces, carbon-neutral '
                       'production. Feels like a weekend.',
    },
    {
        'name': 'Metro High Vol. 2',
        'brand': 'Northline',
        'category': 'lifestyle',
        'price': '129.00',
        'compare_at_price': None,
        'photo': '1595950653106-6c9ebd614d3a',
        'is_featured': False,
        'rating': '4.5', 'reviews': 408,
        'description': 'Full-grain leather, structured high-top, vulcanized gum sole. Street '
                       'ready without trying.',
    },
    {
        'name': 'Urban Drift Runner',
        'brand': 'Vektor',
        'category': 'running',
        'price': '139.00',
        'compare_at_price': None,
        'photo': '1491553895911-0055eca6402d',
        'is_featured': True,
        'rating': '4.7', 'reviews': 967,
        'description': 'Daily trainer tuned for the city. Mesh upper breathes, cushioned heel '
                       'absorbs sidewalk shock.',
    },
    {
        'name': 'Court King Supreme',
        'brand': 'Nova',
        'category': 'basketball',
        'price': '199.00',
        'compare_at_price': '229.00',
        'photo': '1551107696-a4b0c5a0d9a2',
        'is_featured': True,
        'rating': '4.8', 'reviews': 1104,
        'description': 'Signature series silhouette. Reinforced toe-cap, premium leather '
                       'overlays, and our tallest stack height yet.',
    },
    {
        'name': 'Heritage Trefoil Lo',
        'brand': 'Streetline',
        'category': 'casual',
        'price': '95.00',
        'compare_at_price': None,
        'photo': '1465453869711-7e174808ace9',
        'is_featured': False,
        'rating': '4.6', 'reviews': 2210,
        'description': 'Three-stripe heritage reissue. Suede toe, rubber shell, timeless cut.',
    },
    {
        'name': 'Trail Burst GTX',
        'brand': 'Northline',
        'category': 'running',
        'price': '169.00',
        'compare_at_price': None,
        'photo': '1460353581641-37baddab0fa2',
        'is_featured': False,
        'rating': '4.7', 'reviews': 601,
        'description': 'Weatherproof trail runner. Lugged outsole bites loose terrain, GORE-TEX '
                       'liner keeps rain out.',
    },
    {
        'name': 'Pouncer Street Lo',
        'brand': 'Pumatic',
        'category': 'lifestyle',
        'price': '99.00',
        'compare_at_price': '129.00',
        'photo': '1552066344-2464c1135c32',
        'is_featured': False,
        'rating': '4.5', 'reviews': 388,
        'description': 'Clean, confident, everyday. Suede panels and a wrapped foxing stripe.',
    },
    {
        'name': 'Chunker Nineties',
        'brand': 'Vektor',
        'category': 'lifestyle',
        'price': '149.00',
        'compare_at_price': None,
        'photo': '1570299437488-d430e1e677c9',
        'is_featured': False,
        'rating': '4.4', 'reviews': 274,
        'description': 'Oversized dad-shoe energy. Chunky TPU sole, layered mesh and leather.',
    },
    {
        'name': 'Sunrise 85 Orange',
        'brand': 'Streetline',
        'category': 'casual',
        'price': '109.00',
        'compare_at_price': None,
        'photo': '1518002171953-a080ee817e1f',
        'is_featured': False,
        'rating': '4.5', 'reviews': 155,
        'description': 'Pop of color your rotation needed. Bright uppers, cream midsole.',
    },
    {
        'name': 'Fog Grey Minimal',
        'brand': 'Allbird',
        'category': 'casual',
        'price': '85.00',
        'compare_at_price': None,
        'photo': '1525966222134-fcfa99b8ae77',
        'is_featured': False,
        'rating': '4.6', 'reviews': 1803,
        'description': 'Minimalism, perfected. Monochrome upper, invisible branding, maximum '
                       'go-anywhere.',
    },
    {
        'name': 'Deep Navy Court',
        'brand': 'Nova',
        'category': 'basketball',
        'price': '159.00',
        'compare_at_price': '189.00',
        'photo': '1587563871167-1ee9c731aefb',
        'is_featured': False,
        'rating': '4.7', 'reviews': 622,
        'description': 'Low-profile court shoe in a tonal navy. Responsive foam, grippy herringbone.',
    },
    {
        'name': 'Air Jet 1 Retro',
        'brand': 'Nova',
        'category': 'basketball',
        'price': '189.00',
        'compare_at_price': None,
        'photo': '1515955656352-a1fa3ffcd111',
        'is_featured': True,
        'rating': '4.9', 'reviews': 4208,
        'description': 'The original takes flight again. OG colorway, perforated toe, premium leather.',
    },
    {
        'name': 'Obsidian Low',
        'brand': 'Vektor',
        'category': 'casual',
        'price': '115.00',
        'compare_at_price': None,
        'photo': '1600185365778-7876289e6a3e',
        'is_featured': False,
        'rating': '4.6', 'reviews': 490,
        'description': 'Blacked-out everything. Elevated basics for the everyday pull.',
    },
    {
        'name': 'Trail Lite White',
        'brand': 'Streetline',
        'category': 'running',
        'price': '129.00',
        'compare_at_price': None,
        'photo': '1584735175315-9d5df23860e6',
        'is_featured': False,
        'rating': '4.5', 'reviews': 331,
        'description': 'Breathable mesh, crisp white colorway, feather-light at 8.4oz.',
    },
    {
        'name': 'Olive Field Boot',
        'brand': 'Northline',
        'category': 'lifestyle',
        'price': '139.00',
        'compare_at_price': '169.00',
        'photo': '1549298916-b41d501d3772',
        'is_featured': False,
        'rating': '4.4', 'reviews': 198,
        'description': 'Sneaker meets field boot. Waxed canvas upper, utility hardware.',
    },
    {
        'name': 'Crimson Court 73',
        'brand': 'Streetline',
        'category': 'casual',
        'price': '99.00',
        'compare_at_price': None,
        'photo': '1608231387042-66d1773070a5',
        'is_featured': False,
        'rating': '4.6', 'reviews': 712,
        'description': 'Vintage court silhouette, modern crimson treatment. Easy pairing, loud enough.',
    },
    {
        'name': 'Velocity Pro 2024',
        'brand': 'Nova',
        'category': 'running',
        'price': '219.00',
        'compare_at_price': '249.00',
        'photo': '1542291026-7eec264c27ff',
        'is_featured': False,
        'rating': '4.8', 'reviews': 889,
        'description': 'Our flagship race-day shoe. Carbon plate, PEBA foam, built for PRs.',
    },
]


def run():
    created = 0
    for data in PRODUCTS:
        slug = data['name'].lower().replace(' ', '-').replace('.', '').replace('/', '-')
        defaults = {
            'name': data['name'],
            'brand': data['brand'],
            'category': data['category'],
            'description': data['description'],
            'price': Decimal(data['price']),
            'compare_at_price': Decimal(data['compare_at_price']) if data['compare_at_price'] else None,
            'image_url': unsplash(data['photo']),
            'stock': 120,
            'is_featured': data['is_featured'],
            'rating': Decimal(data['rating']),
            'review_count': data['reviews'],
        }
        _, was_created = Product.objects.update_or_create(slug=slug, defaults=defaults)
        if was_created:
            created += 1
    print(f'Seeded {len(PRODUCTS)} products ({created} newly created).')


if __name__ == '__main__':
    run()
