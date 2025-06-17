import { useState } from "react";
import toast from "react-hot-toast";
import { BACKEND_API } from "../data/DATA";

export default function ReviewForm({ productId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (rating === 0 || comment.trim() === "") {
      toast.error("Please provide both a rating and a review.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login to submit a review.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("productId", productId);
    formData.append("rating", rating);
    formData.append("reviewText", comment);
    if (image) {
      if (!image.type.startsWith("image/")) {
        toast.error("Only image files are allowed.");
        return;
      }
      formData.append("photo", image);
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${BACKEND_API}/review/${productId}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response Data:", data);

      if (response.status === 400) {
        toast.error("Review already submitted");
        return;
      }

      if (!response.ok) throw new Error("Failed to submit review");

      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      setImage(null);
    } catch (error) {
      toast.error("Something went wrong while submitting your review.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-200"
    >
      {/* Review Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Review
        </label>
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
      </div>

      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star} className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={star}
                onChange={() => setRating(star)}
                className="hidden"
              />
              <span
                className={`text-3xl transition ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Image (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full text-sm text-gray-700
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-100 file:text-blue-700
            hover:file:bg-blue-200
            cursor-pointer"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className={`w-full ${
          submitting ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition`}
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
