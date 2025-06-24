import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import ProductForm from '../components/form/ProductForm';
import ProductCard from '../components/card/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const categories = [
    'breakfast',
    'lunch', 
    'dinner',
    'brunch',
    'snacks & sweets'
  ];

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleGetStarted = () => {
    setShowForm(true);
    setEditingProduct(null);
  };

  const handleAddProduct = (productData) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(product => 
        product.id === editingProduct.id ? productData : product
      ));
    } else {
      // Add new product
      setProducts(prev => [...prev, productData]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1F2937] mb-2">Products</h1>
        <p className="text-[#6B7280]">Manage your product inventory and catalog.</p>
      </div>
      
   

      {/* Conditional rendering: Show form or products list */}
      {showForm ? (
        /* Product Form Section */
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#1F2937]">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={handleCancelForm}
              className="text-[#6B7280] hover:text-[#1F2937] transition-colors px-4 py-2 border border-[#E5E7EB] rounded-lg"
            >
              Back to Products
            </button>
          </div>
          <ProductForm
            onSubmit={handleAddProduct}
            onCancel={handleCancelForm}
            initialData={editingProduct}
            isEdit={!!editingProduct}
            isInline={true}
          />
        </div>
      ) : (
        /* Products Section */
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-[#1F2937]">Your Products</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>

          {/* Search and Filter */}
          {products.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="text-center py-12">
              <div className="text-[#6B7280] mb-4">
                <Search size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">No products found</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-[#6B7280] mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={32} className="opacity-50" />
                </div>
                <p className="text-lg mb-2">No products yet</p>
                <p className="text-sm mb-4">Get started by adding your first product to reduce food waste and increase revenue.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Your First Product
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

