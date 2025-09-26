from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
from database.connection import get_db
from models.product import Product, ProductResponse, ProductCreate
from services.scraper import ProductScraper
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=List[ProductResponse])
def get_products(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """
    Get all products from the database with pagination
    """
    try:
        products = db.query(Product).offset(skip).limit(limit).all()
        return products
    except Exception as e:
        logger.error(f"Error fetching products: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """
    Get a specific product by ID
    """
    try:
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching product {product_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/scrape")
def scrape_products(background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Trigger product scraping and store results in database
    """
    try:
        scraper = ProductScraper()
        products_data = scraper.scrape_demo_products()
        
        if not products_data:
            raise HTTPException(status_code=400, detail="No products found during scraping")
        
        # Clear existing products (for demo purposes)
        db.query(Product).delete()
        db.commit()
        
        # Add new products
        for product_data in products_data:
            product = Product(**product_data)
            db.add(product)
        
        db.commit()
        
        return {
            "message": f"Successfully scraped and stored {len(products_data)} products",
            "count": len(products_data)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during scraping: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Error during scraping process")

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    """
    Delete a specific product by ID
    """
    try:
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        db.delete(product)
        db.commit()
        return {"message": "Product deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting product {product_id}: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")