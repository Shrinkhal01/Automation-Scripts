import requests
from bs4 import BeautifulSoup
from typing import List, Dict
import logging
import random
import time

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ProductScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
    def scrape_demo_products(self) -> List[Dict]:
        """
        Demo scraper that generates sample product data
        In a real implementation, replace this with actual website scraping
        """
        try:
            # Demo products data (replace with actual scraping logic)
            demo_products = [
                {
                    "name": "Apple iPhone 15 Pro",
                    "price": 999.99,
                    "link": "https://example.com/iphone-15-pro",
                    "description": "Latest iPhone with titanium design and A17 Pro chip"
                },
                {
                    "name": "Samsung Galaxy S24 Ultra",
                    "price": 1199.99,
                    "link": "https://example.com/galaxy-s24-ultra",
                    "description": "Premium Android phone with S Pen and AI features"
                },
                {
                    "name": "MacBook Air M3",
                    "price": 1099.99,
                    "link": "https://example.com/macbook-air-m3",
                    "description": "Lightweight laptop with M3 chip and all-day battery"
                },
                {
                    "name": "Dell XPS 13",
                    "price": 899.99,
                    "link": "https://example.com/dell-xps-13",
                    "description": "Compact Windows laptop with premium build quality"
                },
                {
                    "name": "Sony WH-1000XM5",
                    "price": 399.99,
                    "link": "https://example.com/sony-wh1000xm5",
                    "description": "Industry-leading noise canceling headphones"
                }
            ]
            
            # Add some randomness to simulate dynamic pricing
            for product in demo_products:
                # Randomly adjust price by ±10%
                variation = random.uniform(0.9, 1.1)
                product['price'] = round(product['price'] * variation, 2)
            
            logger.info(f"Successfully scraped {len(demo_products)} products")
            return demo_products
            
        except Exception as e:
            logger.error(f"Error scraping products: {str(e)}")
            return []
    
    def scrape_website(self, url: str) -> List[Dict]:
        """
        Generic website scraper - customize this method for specific websites
        """
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            products = []
            
            # Example scraping logic (customize based on target website)
            # This is a template - modify selectors based on the actual website structure
            product_elements = soup.find_all('div', class_='product-item')
            
            for element in product_elements:
                try:
                    name = element.find('h3', class_='product-title')
                    price = element.find('span', class_='price')
                    link = element.find('a', href=True)
                    description = element.find('p', class_='description')
                    
                    if name and price and link:
                        # Clean and extract text
                        product_name = name.get_text(strip=True)
                        product_price = float(price.get_text(strip=True).replace('$', '').replace(',', ''))
                        product_link = link['href']
                        product_description = description.get_text(strip=True) if description else ""
                        
                        products.append({
                            "name": product_name,
                            "price": product_price,
                            "link": product_link,
                            "description": product_description
                        })
                        
                except Exception as e:
                    logger.warning(f"Error parsing product element: {str(e)}")
                    continue
            
            # Add delay to be respectful to the website
            time.sleep(1)
            
            logger.info(f"Successfully scraped {len(products)} products from {url}")
            return products
            
        except requests.RequestException as e:
            logger.error(f"Request error when scraping {url}: {str(e)}")
            return []
        except Exception as e:
            logger.error(f"Error scraping {url}: {str(e)}")
            return []