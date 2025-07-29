import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Edit, 
  Trash2, 
  ArrowLeft, 
  Plus,
  Calendar,
  ThumbsUp,
  MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("my-reviews");

  // Mock data for reviews
  const myReviews = [
    {
      id: 1,
      productName: "Premium Kashmiri Saffron",
      productImage: "https://via.placeholder.com/60x60",
      rating: 5,
      title: "Excellent Quality Saffron",
      review: "This is the best saffron I've ever used. The color and aroma are exceptional. Highly recommend for anyone who loves authentic Kashmiri saffron.",
      date: "2024-01-15",
      helpful: 12,
      comments: 3,
      isVerified: true,
      status: "published"
    },
    {
      id: 2,
      productName: "Organic Saffron Threads",
      productImage: "https://via.placeholder.com/60x60",
      rating: 4,
      title: "Good but expensive",
      review: "The quality is good and the saffron is authentic. However, it's quite expensive compared to other brands. Would buy again if on sale.",
      date: "2024-01-10",
      helpful: 8,
      comments: 1,
      isVerified: true,
      status: "published"
    },
    {
      id: 3,
      productName: "Saffron Powder",
      productImage: "https://via.placeholder.com/60x60",
      rating: 3,
      title: "Average quality",
      review: "The powder form is convenient but I prefer threads. The taste is okay but not as strong as I expected.",
      date: "2024-01-05",
      helpful: 5,
      comments: 0,
      isVerified: false,
      status: "pending"
    }
  ];

  const pendingReviews = [
    {
      id: 4,
      productName: "Saffron Tea Bags",
      productImage: "https://via.placeholder.com/60x60",
      orderDate: "2024-01-20",
      canReview: true
    },
    {
      id: 5,
      productName: "Saffron Honey",
      productImage: "https://via.placeholder.com/60x60",
      orderDate: "2024-01-18",
      canReview: false
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleEditReview = (reviewId) => {
    // Navigate to edit review page or open modal
    console.log("Edit review:", reviewId);
  };

  const handleDeleteReview = (reviewId) => {
    // Handle review deletion
    console.log("Delete review:", reviewId);
  };

  const handleWriteReview = (productId) => {
    // Navigate to write review page
    console.log("Write review for product:", productId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Reviews</h1>
            <p className="text-gray-600">Manage your product reviews and ratings</p>
          </div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex bg-white rounded-xl shadow-md overflow-hidden mb-6"
        >
          {[
            { id: "my-reviews", label: "My Reviews", count: myReviews.length },
            { id: "pending", label: "Pending Reviews", count: pendingReviews.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-6 text-center transition-all ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="font-medium">{tab.label}</div>
              <div className="text-sm opacity-75">({tab.count})</div>
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "my-reviews" && (
            <motion.div
              key="my-reviews"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {myReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={review.productImage}
                          alt={review.productName}
                          className="w-15 h-15 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {review.productName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-sm text-gray-500">
                              {formatDate(review.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {review.status === "pending" && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                            Pending
                          </span>
                        )}
                        {review.isVerified && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            Verified
                          </span>
                        )}
                        <div className="flex gap-1">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEditReview(review.id)}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteReview(review.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {review.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {review.review}
                      </p>
                    </div>

                    {/* Review Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{review.helpful} helpful</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{review.comments} comments</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {myReviews.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-white rounded-xl shadow-md"
                >
                  <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No reviews yet
                  </h3>
                  <p className="text-gray-500">
                    Start reviewing products you've purchased!
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === "pending" && (
            <motion.div
              key="pending"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {pendingReviews.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-15 h-15 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {item.productName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              Ordered on {formatDate(item.orderDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleWriteReview(item.id)}
                        disabled={!item.canReview}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          item.canReview
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                        {item.canReview ? "Write Review" : "Coming Soon"}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {pendingReviews.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-white rounded-xl shadow-md"
                >
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No pending reviews
                  </h3>
                  <p className="text-gray-500">
                    All your purchased products have been reviewed!
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-xl p-6 shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Reviews", value: myReviews.length, color: "text-blue-600" },
              { label: "Average Rating", value: "4.2", color: "text-yellow-600" },
              { label: "Helpful Votes", value: "25", color: "text-green-600" },
              { label: "Pending Reviews", value: pendingReviews.length, color: "text-orange-600" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reviews; 