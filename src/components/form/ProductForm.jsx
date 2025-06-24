import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';

const ProductForm = ({ onSubmit, onCancel, initialData = null, isEdit = false, isInline = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    allergies: [],
    originalPrice: '',
    discountedPrice: '',
    lunchHour: '',
    description: ''
  });

  const [allergyInput, setAllergyInput] = useState('');
  const [errors, setErrors] = useState({});

  const categories = [
    'breakfast',
    'lunch', 
    'dinner',
    'brunch',
    'snacks & sweets'
  ];

  const exampleAllergies = ['peanuts butter', 'pistachio', 'glucose'];

  // Generate lunch hours from current time to store close (assuming 10 PM)
  const generateLunchHours = () => {
    const hours = [];
    const now = new Date();
    const currentHour = now.getHours();
    const storeCloseHour = 22; // 10 PM
    
    for (let hour = currentHour; hour <= storeCloseHour; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      const displayTime = hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? '12:00 PM' : `${hour}:00 AM`;
      hours.push({ value: timeString, label: displayTime });
    }
    return hours;
  };

  const lunchHours = generateLunchHours();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    // Calculate discounted price (30% off)
    if (formData.originalPrice) {
      const original = parseFloat(formData.originalPrice);
      if (!isNaN(original)) {
        const discounted = (original * 0.7).toFixed(2);
        setFormData(prev => ({ ...prev, discountedPrice: discounted }));
      }
    } else {
      setFormData(prev => ({ ...prev, discountedPrice: '' }));
    }
  }, [formData.originalPrice]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addAllergy = (allergy) => {
    const trimmedAllergy = allergy.trim().toLowerCase();
    if (trimmedAllergy && !formData.allergies.includes(trimmedAllergy)) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, trimmedAllergy]
      }));
    }
    setAllergyInput('');
  };

  const removeAllergy = (allergyToRemove) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter(allergy => allergy !== allergyToRemove)
    }));
  };

  const handleAllergyKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addAllergy(allergyInput);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.originalPrice) {
      newErrors.originalPrice = 'Original price is required';
    } else if (isNaN(parseFloat(formData.originalPrice)) || parseFloat(formData.originalPrice) <= 0) {
      newErrors.originalPrice = 'Please enter a valid price';
    }

    if (!formData.lunchHour) {
      newErrors.lunchHour = 'Lunch hour is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        id: initialData?.id || Date.now().toString(),
        createdAt: initialData?.createdAt || new Date().toISOString()
      });
    }
  };

  // If inline, render without modal wrapper
  if (isInline) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-[#E5E7EB]'
            }`}
            placeholder="Enter product name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Box Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.category ? 'border-red-500' : 'border-[#E5E7EB]'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Allergies */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Allergies
          </label>
          <div className="space-y-2">
            <input
              type="text"
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
              onKeyPress={handleAllergyKeyPress}
              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type allergy and press Enter or comma to add"
            />
            <div className="flex flex-wrap gap-2">
              {exampleAllergies.map(example => (
                <button
                  key={example}
                  type="button"
                  onClick={() => addAllergy(example)}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                >
                  + {example}
                </button>
              ))}
            </div>
            {formData.allergies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.allergies.map(allergy => (
                  <span
                    key={allergy}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {allergy}
                    <button
                      type="button"
                      onClick={() => removeAllergy(allergy)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">
              Original Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.originalPrice}
              onChange={(e) => handleInputChange('originalPrice', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.originalPrice ? 'border-red-500' : 'border-[#E5E7EB]'
              }`}
              placeholder="0.00"
            />
            {errors.originalPrice && <p className="text-red-500 text-sm mt-1">{errors.originalPrice}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">
              Discounted Price (30% off)
            </label>
            <input
              type="text"
              value={formData.discountedPrice ? `$${formData.discountedPrice}` : ''}
              readOnly
              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg bg-gray-50 text-gray-600"
              placeholder="Auto-calculated"
            />
          </div>
        </div>

        {/* Lunch Hour */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Available Until
          </label>
          <select
            value={formData.lunchHour}
            onChange={(e) => handleInputChange('lunchHour', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.lunchHour ? 'border-red-500' : 'border-[#E5E7EB]'
            }`}
          >
            <option value="">Select available until time</option>
            {lunchHours.map(hour => (
              <option key={hour.value} value={hour.value}>
                {hour.label}
              </option>
            ))}
          </select>
          {errors.lunchHour && <p className="text-red-500 text-sm mt-1">{errors.lunchHour}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Description (Optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add a description for your product"
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isEdit ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    );
  }

  // Original modal version
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#1F2937]">
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onCancel}
              className="text-[#6B7280] hover:text-[#1F2937] transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Same form content as inline version */}
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-[#E5E7EB]'
                }`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Box Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-[#E5E7EB]'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Allergies */}
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Allergies
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyPress={handleAllergyKeyPress}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type allergy and press Enter or comma to add"
                />
                <div className="flex flex-wrap gap-2">
                  {exampleAllergies.map(example => (
                    <button
                      key={example}
                      type="button"
                      onClick={() => addAllergy(example)}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                    >
                      + {example}
                    </button>
                  ))}
                </div>
                {formData.allergies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.allergies.map(allergy => (
                      <span
                        key={allergy}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {allergy}
                        <button
                          type="button"
                          onClick={() => removeAllergy(allergy)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.originalPrice ? 'border-red-500' : 'border-[#E5E7EB]'
                  }`}
                  placeholder="0.00"
                />
                {errors.originalPrice && <p className="text-red-500 text-sm mt-1">{errors.originalPrice}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Discounted Price (30% off)
                </label>
                <input
                  type="text"
                  value={formData.discountedPrice ? `$${formData.discountedPrice}` : ''}
                  readOnly
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg bg-gray-50 text-gray-600"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>

            {/* Lunch Hour */}
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Available Until
              </label>
              <select
                value={formData.lunchHour}
                onChange={(e) => handleInputChange('lunchHour', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.lunchHour ? 'border-red-500' : 'border-[#E5E7EB]'
                }`}
              >
                <option value="">Select available until time</option>
                {lunchHours.map(hour => (
                  <option key={hour.value} value={hour.value}>
                    {hour.label}
                  </option>
                ))}
              </select>
              {errors.lunchHour && <p className="text-red-500 text-sm mt-1">{errors.lunchHour}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a description for your product"
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-3 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isEdit ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;

