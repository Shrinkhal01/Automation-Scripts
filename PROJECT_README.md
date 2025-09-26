# FastAPI Web Scraping API + React Dashboard

A complete full-stack web application for scraping product prices and visualizing them in a modern dashboard.

## 🌟 Project Overview

This project consists of three main components:

1. **FastAPI Backend** (`/fastapi-scraper/`) - Web scraping API with SQLite database
2. **React Frontend** (`/react-dashboard/`) - Modern dashboard with Tailwind CSS and Chart.js
3. **Deployment Guide** (`/deployment-guide/`) - Step-by-step production deployment instructions

![Dashboard Preview](https://github.com/user-attachments/assets/67ad7c11-56ad-4482-93f3-8ead962f761d)

## ✨ Features

### Backend (FastAPI)
- 🕷️ **Web Scraping**: BeautifulSoup-powered product price scraping
- 📊 **Database**: SQLite storage with SQLAlchemy ORM
- 🔄 **REST API**: Complete CRUD operations for products
- 📝 **Auto Documentation**: Interactive API docs with Swagger/OpenAPI
- 🌐 **CORS Support**: Configured for frontend integration
- ⚡ **Async Support**: Fast and scalable with async/await

### Frontend (React)
- 📊 **Interactive Dashboard**: Product table with sorting and filtering
- 📈 **Price Visualization**: Bar charts with Chart.js
- 🎨 **Modern UI**: Tailwind CSS with responsive design
- 🔄 **Real-time Updates**: Refresh and scrape new data
- 📱 **Mobile Friendly**: Responsive design works on all devices
- ⚡ **Fast Development**: Built with Vite for instant HMR

### Deployment
- 🚀 **Production Ready**: Complete deployment guide for Render/Heroku + Vercel
- 🔒 **Security**: CORS, environment variables, and SSL configuration
- 📊 **Monitoring**: Logging and error tracking setup
- 🔧 **DevOps**: CI/CD pipeline recommendations

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd Automation-Scripts
```

### 2. Start Backend
```bash
cd fastapi-scraper
pip install -r requirements.txt
python start.py
```
Backend will be available at: http://localhost:8000

### 3. Start Frontend
```bash
cd react-dashboard
npm install
npm run dev
```
Frontend will be available at: http://localhost:3000

### 4. Test the Application
1. Open http://localhost:3000 in your browser
2. Click "Scrape New Data" to populate the database
3. View products in the table and price chart
4. Use "Refresh Data" to reload from the database

## 📁 Project Structure

```
Automation-Scripts/
├── fastapi-scraper/           # Python FastAPI backend
│   ├── main.py               # FastAPI application
│   ├── start.py              # Development server
│   ├── requirements.txt      # Python dependencies
│   ├── routes/               # API endpoints
│   │   └── products.py       # Product routes
│   ├── models/               # Database models
│   │   └── product.py        # Product model & schemas
│   ├── services/             # Business logic
│   │   └── scraper.py        # Web scraping service
│   ├── database/             # Database configuration
│   │   └── connection.py     # DB connection & sessions
│   └── README.md            # Backend documentation
├── react-dashboard/          # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ProductTable.jsx  # Product data table
│   │   │   └── PriceChart.jsx    # Price chart
│   │   ├── services/         # API services
│   │   │   └── api.js        # Backend API client
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── package.json          # Node.js dependencies
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── vite.config.js        # Vite configuration
│   └── README.md            # Frontend documentation
├── deployment-guide/         # Production deployment
│   └── README.md            # Deployment instructions
└── PROJECT_README.md        # This file
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information and health |
| GET | `/products/` | List all products (paginated) |
| GET | `/products/{id}` | Get specific product |
| POST | `/products/scrape` | Trigger web scraping |
| DELETE | `/products/{id}` | Delete product |
| GET | `/docs` | Interactive API documentation |

## 🎨 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **BeautifulSoup4** - Web scraping library
- **Requests** - HTTP library
- **Pydantic** - Data validation using Python type hints
- **Uvicorn** - ASGI server for development
- **Gunicorn** - WSGI server for production

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Chart library for data visualization
- **Axios** - HTTP client for API requests
- **React-ChartJS-2** - React wrapper for Chart.js

### Database
- **SQLite** - Development database
- **PostgreSQL** - Production database (recommended)

## 🔍 Web Scraping

The scraper service includes:
- **Demo Mode**: Generates sample product data for testing
- **Generic Scraper**: Template for real website scraping
- **Error Handling**: Robust error handling for network issues
- **Rate Limiting**: Respectful delays between requests
- **Data Validation**: Ensures data quality before storage

### Customizing for Real Websites

To scrape actual e-commerce sites, modify `services/scraper.py`:

```python
def scrape_website(self, url: str) -> List[Dict]:
    # Update selectors for target website
    product_elements = soup.find_all('div', class_='product-item')
    
    for element in product_elements:
        name = element.find('h3', class_='product-title').get_text()
        price = element.find('span', class_='price').get_text()
        link = element.find('a')['href']
        # ... process data
```

## 📊 Dashboard Features

### Product Table
- **Responsive Design**: Works on all screen sizes
- **Rich Data Display**: Product names, descriptions, prices, links
- **Formatted Prices**: Currency formatting with locale support
- **External Links**: Direct links to product pages
- **Timestamps**: Shows when products were scraped

### Price Chart
- **Interactive Visualization**: Hover tooltips with details
- **Color-coded Bars**: Different colors for each product
- **Responsive Layout**: Adapts to container size
- **Real-time Updates**: Refreshes with new data

### Statistics Panel
- **Price Analytics**: Min, max, and average prices
- **Visual Indicators**: Color-coded statistics
- **Dynamic Updates**: Recalculates when data changes

## 🚀 Deployment Options

### Backend Deployment
- **Render** (Recommended) - Easy Python app deployment
- **Heroku** - Traditional PaaS with PostgreSQL addon
- **Railway** - Modern deployment platform
- **DigitalOcean App Platform** - Managed app platform

### Frontend Deployment
- **Vercel** (Recommended) - Optimized for React/Vite
- **Netlify** - JAMstack deployment platform
- **GitHub Pages** - Static site hosting
- **AWS S3 + CloudFront** - Scalable static hosting

### Full Deployment Guide
See comprehensive instructions in `/deployment-guide/README.md`

## 🔒 Security Features

- **CORS Configuration**: Properly configured cross-origin requests
- **Input Validation**: Pydantic models validate all inputs
- **SQL Injection Protection**: SQLAlchemy ORM prevents SQL injection
- **Environment Variables**: Secrets managed via environment variables
- **Rate Limiting**: Built-in delays in scraping service
- **Error Handling**: Secure error messages without data leakage

## 🧪 Testing

### Manual Testing
```bash
# Test backend health
curl http://localhost:8000/health

# Test scraping
curl -X POST http://localhost:8000/products/scrape

# Test data retrieval
curl http://localhost:8000/products/ | python -m json.tool
```

### Frontend Testing
1. Open http://localhost:3000
2. Check browser console for errors
3. Test all buttons and interactions
4. Verify chart displays correctly
5. Test responsive design on mobile

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Update README files for new features
- Test changes before submitting PR

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

### Getting Help
1. **Check Documentation**: README files in each directory
2. **API Documentation**: Visit `/docs` endpoint for interactive API docs
3. **Browser DevTools**: Check console and network tabs for errors
4. **GitHub Issues**: Open an issue for bugs or questions

### Common Issues
- **CORS Errors**: Ensure backend CORS includes frontend URL
- **Database Issues**: Check SQLite file permissions
- **Build Failures**: Clear node_modules and reinstall dependencies
- **API Connection**: Verify both servers are running on correct ports

### Useful Resources
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js Documentation](https://www.chartjs.org/)

## 🎯 Future Enhancements

- [ ] **Authentication**: User authentication and authorization
- [ ] **Real-time Updates**: WebSocket support for live data updates
- [ ] **Advanced Scraping**: Support for JavaScript-rendered pages
- [ ] **Data Export**: Export scraped data to CSV/Excel
- [ ] **Price Alerts**: Email/SMS notifications for price changes
- [ ] **Multiple Sites**: Support for scraping multiple e-commerce sites
- [ ] **Caching**: Redis caching for improved performance
- [ ] **Dark Mode**: Dark theme support for the dashboard
- [ ] **Mobile App**: React Native mobile application
- [ ] **Machine Learning**: Price prediction and trend analysis

---

**Built with ❤️ for the automation community**