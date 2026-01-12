/**
 * Shop Page - Restaurant detail with menu
 *
 * Features: Shop banner, info (rating, delivery time, address), menu items grid
 * Fetches shop data by shopId from URL params
 * FoodCard components with add-to-cart functionality
 */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { serverUrl } from '../App';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaStore,
  FaLocationDot,
  FaStar,
  FaClock,
  FaUtensils,
  FaMotorcycle,
} from 'react-icons/fa6';
import FoodCard from '../components/FoodCard';
import Nav from '../components/Nav';

function Shop() {
  const { shopId } = useParams();
  const [items, setItems] = useState([]);
  const [shop, setShop] = useState(null);
  const navigate = useNavigate();

  const handleShop = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/get-by-shop/${shopId}`,
        {
          withCredentials: true,
        },
      );
      setShop(result.data.shop);
      setItems(result.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleShop();
  }, [shopId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      {/* Hero Banner Section */}
      {shop && (
        <div className="relative pt-20">
          {/* Background Image with Overlay */}
          <div className="relative w-full h-56 md:h-64 lg:h-72 overflow-hidden">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          </div>

          {/* Shop Info Card - Overlapping */}
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="relative -mt-20 md:-mt-24 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Shop Logo/Icon */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#E23744] to-[#c02a35] rounded-2xl flex items-center justify-center shadow-lg">
                    <FaStore className="text-white text-3xl md:text-4xl" />
                  </div>
                </div>

                {/* Shop Details */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 truncate">
                    {shop.name}
                  </h1>
                  
                  {/* Cuisine Tags */}
                  {shop.cuisine && (
                    <div className="flex items-center gap-2 mb-4">
                      <FaUtensils className="text-gray-400 text-sm" />
                      <p className="text-gray-600 text-sm md:text-base">{shop.cuisine}</p>
                    </div>
                  )}

                  {/* Location */}
                  <div className="flex items-start gap-2 mb-4">
                    <FaLocationDot className="text-[#E23744] text-sm mt-1 flex-shrink-0" />
                    <p className="text-gray-600 text-sm md:text-base">{shop.address}</p>
                  </div>

                  {/* Stats Row */}
                  <div className="flex flex-wrap items-center gap-3">
                    {shop.rating && (
                      <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
                        <FaStar className="text-green-600 text-sm" />
                        <span className="font-semibold text-sm">{shop.rating}</span>
                        <span className="text-green-600 text-xs">Rating</span>
                      </div>
                    )}

                    {shop.deliveryTime && (
                      <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full">
                        <FaClock className="text-orange-500 text-sm" />
                        <span className="font-semibold text-sm">{shop.deliveryTime}</span>
                        <span className="text-orange-600 text-xs">mins</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">
                      <FaMotorcycle className="text-blue-500 text-sm" />
                      <span className="text-blue-600 text-xs font-medium">Free Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Menu</h2>
            <p className="text-gray-500 mt-1">{items.length} items available</p>
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {items.map((item) => (
              <FoodCard data={item} key={item._id} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUtensils className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-gray-900 text-xl font-bold mb-2">
              No Items Available
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              This restaurant hasn't added any menu items yet. Check back later!
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-[#E23744] text-white font-semibold rounded-xl hover:bg-[#c02a35] transition-all hover:shadow-lg"
            >
              Explore Other Restaurants
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
