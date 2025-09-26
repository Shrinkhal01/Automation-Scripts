import React, { useState, useEffect } from 'react';
import ProductTable from './components/ProductTable';
import PriceChart from './components/PriceChart';
import { fetchProducts, scrapeProducts } from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products. Make sure the FastAPI server is running on http://localhost:8000');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async () => {
    setLoading(true);
    setError(null);
    try {
      await scrapeProducts();
      await loadProducts(); // Reload products after scraping
    } catch (err) {
      setError('Failed to scrape products. Make sure the FastAPI server is running.');
      console.error('Error scraping products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Product Price Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            Real-time product pricing data from web scraping
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={loadProducts}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Loading...' : 'Refresh Data'}
            </button>
            <button
              onClick={handleScrape}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Scraping...' : 'Scrape New Data'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Table */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Products ({products.length})
            </h2>
            <ProductTable products={products} loading={loading} />
          </div>

          {/* Price Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Price Comparison
            </h2>
            <PriceChart products={products} />
          </div>
        </div>

        {/* Additional Stats */}
        {products.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  ${Math.min(...products.map(p => p.price)).toFixed(2)}
                </p>
                <p className="text-gray-600">Lowest Price</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  ${Math.max(...products.map(p => p.price)).toFixed(2)}
                </p>
                <p className="text-gray-600">Highest Price</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  ${(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)}
                </p>
                <p className="text-gray-600">Average Price</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;