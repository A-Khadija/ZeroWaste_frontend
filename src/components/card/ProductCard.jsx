import React, { useState } from 'react';
import { Edit, Trash2, Clock, Tag, AlertTriangle } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
    setDeleteStep(1);
  };

  const handleDeleteConfirm = () => {
    if (deleteStep === 1) {
      setDeleteStep(2);
    } else {
      onDelete(product.id);
      setShowDeleteConfirm(false);
      setDeleteStep(1);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteStep(1);
  };

  const formatTime = (timeString) => {
    const [hour] = timeString.split(':');
    const hourNum = parseInt(hour);
    return hourNum > 12 ? `${hourNum - 12}:00 PM` : hourNum === 12 ? '12:00 PM' : `${hourNum}:00 AM`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'breakfast': 'bg-yellow-100 text-yellow-800',
      'lunch': 'bg-green-100 text-green-800',
      'dinner': 'bg-purple-100 text-purple-800',
      'brunch': 'bg-orange-100 text-orange-800',
      'snacks & sweets': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-2">{product.name}</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(product.category)}`}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(product)}
              className="p-2 text-[#6B7280] hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit product"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={handleDeleteClick}
              className="p-2 text-[#6B7280] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete product"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {product.description && (
          <p className="text-[#6B7280] mb-4 text-sm">{product.description}</p>
        )}

        <div className="space-y-3">
          {/* Pricing */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-green-600">${product.discountedPrice}</span>
              <span className="text-sm text-[#6B7280] line-through">${product.originalPrice}</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                30% OFF
              </span>
            </div>
          </div>

          {/* Available Until */}
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Clock size={16} />
            <span>Available until {formatTime(product.lunchHour)}</span>
          </div>

          {/* Allergies */}
          {product.allergies && product.allergies.length > 0 && (
            <div className="flex items-start gap-2">
              <AlertTriangle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {product.allergies.map(allergy => (
                  <span
                    key={allergy}
                    className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
          <p className="text-xs text-[#6B7280]">
            Added {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

       {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937]">
                  Are you absolutely sure?
                </h3>
                <p className="text-[#6B7280] text-sm">
                  This will permanently delete the product and all associated data.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 px-4 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-2 rounded-lg transition-colors bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Yes, Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;

