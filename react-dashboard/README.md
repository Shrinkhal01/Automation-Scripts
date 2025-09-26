# React Product Price Dashboard

A modern React dashboard for visualizing product price data from the FastAPI scraping backend. Built with React, Vite, Tailwind CSS, and Chart.js.

## Features

- 📊 Interactive product price table
- 📈 Price comparison bar chart
- 🔄 Real-time data refresh
- 📱 Responsive design with Tailwind CSS
- ⚡ Fast development with Vite
- 🎨 Modern UI components
- 📈 Price statistics dashboard

## Project Structure

```
react-dashboard/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ProductTable.jsx    # Product data table
│   │   └── PriceChart.jsx      # Price comparison chart
│   ├── services/        # API services
│   │   └── api.js       # FastAPI client
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles and Tailwind imports
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── postcss.config.js    # PostCSS configuration
```

## Screenshots

![Dashboard Preview](https://github.com/user-attachments/assets/67ad7c11-56ad-4482-93f3-8ead962f761d)

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- FastAPI backend running (see `/fastapi-scraper/README.md`)

### Installation

1. **Navigate to the dashboard directory**:
```bash
cd react-dashboard
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open in browser**:
   - Dashboard: http://localhost:3000

### Build for Production

```bash
npm run build
```

## Components

### App.jsx
Main application component that manages:
- Product state management
- API communication
- Error handling
- Loading states

### ProductTable.jsx
Displays product data in a responsive table with:
- Product names and descriptions
- Formatted prices
- External product links
- Scraping timestamps

### PriceChart.jsx
Interactive bar chart showing:
- Price comparison across products
- Color-coded bars
- Hover tooltips with details
- Responsive design

### API Service (api.js)
Handles all backend communication:
- Product fetching
- Scraping triggers
- Error handling
- Request/response logging

## Features

### Dashboard Overview
- **Product Count**: Shows total number of scraped products
- **Refresh Data**: Fetches latest data from backend
- **Scrape New Data**: Triggers new scraping session
- **Error Handling**: User-friendly error messages

### Product Table
- **Responsive Design**: Works on mobile and desktop
- **Formatted Prices**: Currency formatting
- **External Links**: Direct links to product pages
- **Timestamps**: Shows when data was scraped

### Price Chart
- **Interactive Bars**: Hover for detailed information
- **Color Coding**: Different colors for each product
- **Responsive**: Adjusts to container size
- **Tooltips**: Rich tooltips with product details

### Statistics Panel
- **Lowest Price**: Cheapest product price
- **Highest Price**: Most expensive product price
- **Average Price**: Calculated average across all products

## API Integration

### Configuration

Update the API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-fastapi-backend.onrender.com'
  : 'http://localhost:8000';
```

### Environment Variables

Create `.env.local` for local development:
```
VITE_API_URL=http://localhost:8000
```

Create `.env.production` for production:
```
VITE_API_URL=https://your-fastapi-backend.onrender.com
```

### API Endpoints Used

| Method | Endpoint | Usage |
|--------|----------|-------|
| GET | `/products/` | Fetch all products |
| GET | `/products/{id}` | Fetch single product |
| POST | `/products/scrape` | Trigger scraping |

## Styling

### Tailwind CSS
The dashboard uses Tailwind CSS for styling:
- **Responsive utilities**: Mobile-first design
- **Color palette**: Consistent color scheme
- **Component classes**: Reusable utility classes
- **Dark mode ready**: Easy to implement dark mode

### Customization

Modify `tailwind.config.js` to customize:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

## Chart.js Integration

### Chart Configuration
The price chart uses Chart.js with react-chartjs-2:
- **Bar charts**: For price comparison
- **Responsive**: Automatically resizes
- **Interactive**: Hover effects and tooltips
- **Customizable**: Easy to modify colors and styling

### Adding New Chart Types

```jsx
import { Line, Pie, Doughnut } from 'react-chartjs-2';

// Example: Add a line chart for price trends
const PriceTrendChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [{
      label: 'Price Trend',
      data: data.map(item => item.price),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
    }]
  };

  return <Line data={chartData} />;
};
```

## Error Handling

### API Errors
- Network errors are caught and displayed to users
- Retry functionality for failed requests
- Loading states during API calls

### User Feedback
- Success messages for actions
- Error alerts with helpful information
- Loading spinners and disabled states

## Performance Optimizations

### Code Splitting
The app uses dynamic imports for large dependencies:
```javascript
const Chart = lazy(() => import('./components/PriceChart'));
```

### Memoization
Components use React.memo and useMemo for optimization:
```javascript
const MemoizedChart = React.memo(PriceChart);
```

### Bundle Analysis
```bash
npm run build
npm run preview
```

## Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Development Tips

1. **Hot Reload**: Vite provides instant hot reload
2. **Error Overlay**: Development errors shown in browser
3. **API Proxy**: Configure proxy in `vite.config.js` if needed
4. **Browser DevTools**: React DevTools recommended

### Adding New Features

1. **New Component**:
```jsx
// src/components/NewComponent.jsx
import React from 'react';

const NewComponent = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Your component content */}
    </div>
  );
};

export default NewComponent;
```

2. **New API Endpoint**:
```javascript
// src/services/api.js
export const newAPIFunction = async (data) => {
  try {
    const response = await api.post('/new-endpoint', data);
    return response.data;
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};
```

## Deployment

See `/deployment-guide/README.md` for detailed deployment instructions to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**

### Quick Vercel Deployment

```bash
npm install -g vercel
vercel
```

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure backend CORS is configured correctly
   - Check API URL configuration

2. **Build Failures**:
   - Clear `node_modules` and reinstall
   - Check for dependency conflicts

3. **Chart Not Displaying**:
   - Verify Chart.js components are imported
   - Check browser console for errors

4. **API Connection Issues**:
   - Verify backend is running
   - Check network tab in developer tools
   - Validate API URLs

### Debug Mode

Enable debug logging:
```javascript
// In api.js
console.log('API Request:', config);
console.log('API Response:', response);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow existing code style
4. Test your changes
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For help and support:
1. Check this README
2. Review browser console for errors
3. Check network requests in DevTools
4. Verify backend API is accessible
5. Open an issue on GitHub