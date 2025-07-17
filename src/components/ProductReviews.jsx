import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { Loader2, User, Star, MoreVertical } from "lucide-react";

const ProductReviews = ({ ProductId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  const { user } = useAuth();

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/reviews/get/${ProductId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.reviews) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error("Error fetching product reviews:", error);
      toast.error("Failed to load product reviews. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [ProductId, backendUrl, token]);

  const renderStars = (rating) => {
    return (
      <div className="flex space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill={i < rating ? "#facc15" : "none"}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-orange-500" />
      </div>
    );
  }

  const handleSubmitReview = async () => {
    if (!rating || !title || !comment) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const url = isEditMode
        ? `${backendUrl}/api/reviews/update/${editReviewId}`
        : `${backendUrl}/api/reviews/add`;

      const method = isEditMode ? "put" : "post";

      const response = await axios[method](
        url,
        {
          productId: ProductId,
          rating,
          title,
          comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success(
          isEditMode ? "Review updated successfully." : "Review submitted."
        );
        setIsModalOpen(false);
        setRating(0);
        setTitle("");
        setComment("");
        setIsEditMode(false);
        setEditReviewId(null);

        // Re-fetch full reviews
        fetchReviews(); // ✅ ensures full populated userId
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review. Try again.");
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/reviews/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success("Review deleted.");
        setReviews((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete review.");
    }
  };

  const isOwnReview = (reviewUserId) => {
    return user && reviewUserId === user.id;
  };

  console.log("Logged-in user:", user);
  console.log(
    "Review user ID:",
    reviews.map((r) => r.userId?._id)
  );

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-md"
        >
          Write a Review
        </button>
      </div>

      <ul className="space-y-4">
        {reviews.map((review) => (
          <li
            key={review._id}
            className="p-5 bg-white rounded-xl shadow border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <User className="w-6 h-6 text-orange-500" />
              </div>
              <div className="flex justify-between items-start w-full">
                <div>
                  <div className="font-semibold text-gray-700">
                    {review.userId.firstName} {review.userId.lastName}
                  </div>
                  <div className="text-xs text-gray-500">
                    Reviewed on {dayjs(review.createdAt).format("MMM D, YYYY")}
                  </div>
                </div>

                {isOwnReview(review.userId._id) && (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setReviews((prev) =>
                          prev.map((r) =>
                            r._id === review._id
                              ? { ...r, showMenu: !r.showMenu }
                              : { ...r, showMenu: false }
                          )
                        )
                      }
                    >
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>

                    {review.showMenu && (
                      <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md border z-10 w-[100px]">
                        <button
                          onClick={() => {
                            setRating(review.rating);
                            setTitle(review.title);
                            setComment(review.comment);
                            setEditReviewId(review._id);
                            setIsEditMode(true);
                            setIsModalOpen(true);
                            setReviews((prev) =>
                              prev.map((r) =>
                                r._id === review._id
                                  ? { ...r, showMenu: false }
                                  : r
                              )
                            );
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setReviews((prev) =>
                              prev.map((r) =>
                                r._id === review._id
                                  ? { ...r, showMenu: false }
                                  : r
                              )
                            );
                            if (
                              confirm(
                                "Are you sure you want to delete this review?"
                              )
                            ) {
                              handleDeleteReview(review._id);
                            }
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-2">{renderStars(review.rating)}</div>

            <h3 className="font-bold text-gray-700 mb-2">{review.title}</h3>

            <p className="text-gray-700 text-sm">{review.comment}</p>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-10 z-50">
          <div className="bg-white rounded-xl shadow-lg w-[90%] md:w-[50%] relative">
            {/* Modal Header */}
            <div className="bg-orange-500 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
              <h3 className="text-xl md:text-2xl font-semibold">
                {isEditMode ? "Edit Your Review" : "Write a Review"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white text-xl hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Rating */}
              <div className="mb-4">
                <label className="block text-base font-semibold mb-3 text-gray-700">
                  Rating:
                </label>
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-8 h-8 cursor-pointer ${
                        i < (hoverRating || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill={i < (hoverRating || rating) ? "#facc15" : "none"}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-base font-semibold mb-3 text-gray-700">
                  Title:
                </label>
                <input
                  type="text"
                  placeholder="E.g., Excellent product quality"
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label className="block text-base font-semibold mb-3 text-gray-700">
                  Comment:
                </label>
                <textarea
                  placeholder="Share your thoughts about the product..."
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <button
                  onClick={handleSubmitReview}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
