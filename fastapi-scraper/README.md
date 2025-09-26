# FastAPI Product Price Scraper

A FastAPI web application that scrapes product prices from websites and provides REST API endpoints for accessing the scraped data.

## Features

- 🕷️ Web scraping with BeautifulSoup
- 📊 SQLite database storage
- 🔄 RESTful API endpoints
- 🌐 CORS support for frontend integration
- 📝 Automatic API documentation
- ⚡ Fast and async with FastAPI

## Project Structure

```
fastapi-scraper/
├── main.py              # FastAPI application entry point
├── start.py             # Development server startup script
├── requirements.txt     # Python dependencies
├── routes/              # API route handlers
│   └── products.py      # Product-related endpoints
├── models/              # Database models and Pydantic schemas
│   └── product.py       # Product model and schemas
├── services/            # Business logic
│   └── scraper.py       # Web scraping service
└── database/            # Database configuration
    └── connection.py    # Database connection and session management
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Root endpoint with API information |
| GET | `/health` | Health check endpoint |
| GET | `/products/` | Get all products with pagination |
| GET | `/products/{id}` | Get a specific product by ID |
| POST | `/products/scrape` | Trigger product scraping |
| DELETE | `/products/{id}` | Delete a specific product |

## Quick Start

### Prerequisites

- Python 3.9+
- pip

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd fastapi-scraper
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

3. **Run the application**:
```bash
python start.py
```

4. **Access the API**:
   - API: http://localhost:8000
   - Interactive docs: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Development

**Start development server with auto-reload**:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Run with Gunicorn (production)**:
```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Usage Examples

### Scrape Products
```bash
curl -X POST http://localhost:8000/products/scrape
```

### Get All Products
```bash
curl http://localhost:8000/products/
```

### Get Specific Product
```bash
curl http://localhost:8000/products/1
```

### Python Client Example
```python
import requests

# Scrape new products
response = requests.post("http://localhost:8000/products/scrape")
print(response.json())

# Get all products
response = requests.get("http://localhost:8000/products/")
products = response.json()
for product in products:
    print(f"{product['name']}: ${product['price']}")
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `sqlite:///./products.db` |
| `PORT` | Server port | `8000` |

### Database

The application uses SQLite by default. For production, use PostgreSQL:

```bash
export DATABASE_URL="postgresql://user:password@localhost/dbname"
```

## Web Scraping

The scraper service (`services/scraper.py`) currently includes:

- **Demo mode**: Generates sample product data for testing
- **Generic scraper**: Template for scraping real websites
- **Rate limiting**: Built-in delays to be respectful to websites
- **Error handling**: Robust error handling for network issues

### Customizing the Scraper

To scrape a specific website, modify the `scrape_website` method in `services/scraper.py`:

```python
def scrape_website(self, url: str) -> List[Dict]:
    # Your custom scraping logic here
    # Update CSS selectors based on target website
    product_elements = soup.find_all('div', class_='your-product-class')
    # ... rest of scraping logic
```

## Database Schema

### Products Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | Integer | Primary key |
| `name` | String(255) | Product name |
| `price` | Float | Product price |
| `link` | Text | Product URL |
| `description` | Text | Product description (optional) |
| `scraped_at` | DateTime | When the product was scraped |
| `updated_at` | DateTime | Last update timestamp |

## Error Handling

The API includes comprehensive error handling:

- **404**: Product not found
- **400**: Bad request (e.g., no products found during scraping)
- **500**: Internal server error
- **Validation errors**: Pydantic model validation

## Security

- **CORS**: Configured for frontend integration
- **Input validation**: Pydantic models validate all inputs
- **SQL injection protection**: SQLAlchemy ORM prevents SQL injection
- **Rate limiting**: Built-in delays in scraping service

## Testing

### Manual Testing

```bash
# Test health endpoint
curl http://localhost:8000/health

# Test scraping
curl -X POST http://localhost:8000/products/scrape

# Test data retrieval
curl http://localhost:8000/products/
```

### Integration with Frontend

The API is designed to work with the React dashboard. Make sure to:

1. Start the FastAPI server first
2. Configure CORS origins to include your frontend URL
3. Update frontend API base URL to match your backend URL

## Deployment

See the deployment guide in `/deployment-guide/README.md` for detailed instructions on deploying to:

- **Render** (recommended)
- **Heroku** 
- **Railway**
- **DigitalOcean App Platform**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
1. Check the deployment guide
2. Review the API documentation at `/docs`
3. Check logs for error messages
4. Open an issue on GitHub