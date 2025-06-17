// src/components/ProductCard.jsx
import ReviewForm from "./ReviewForm";
export default function ProductCard({ product }) {
  const { name, image, rating, reviews,id } = product;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto my-6">
        <img
        src={image}
        alt={name}
        className="aspect-[4/3] w-full object-cover rounded-xl shadow-md border border-gray-200 mb-4"
        />

      <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
      <p className="text-yellow-500 text-sm mt-1">
        ⭐ {rating?.avg || "No rating"}{" "}
        <span className="text-gray-600">({rating?.count || 0} ratings)</span>
      </p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Reviews:</h3>
        {/* Review content */}
            <ul className="space-y-4">
                    {reviews.map((rev, idx) => (
                        <li
                        key={idx}
                        className="text-sm text-gray-800 bg-gray-100 px-4 py-3 rounded-md"
                        >
                        <div className="flex items-center justify-between mb-1">
                            <strong className="text-gray-900">{rev?.user?.name || "User"}</strong>
                            <span className="text-yellow-500 text-xs">
                            ⭐ {rev?.rating || "N/A"}
                            </span>
                        </div>

                        <p className="mb-2">{rev?.comment || "No review text available."}</p>

                        {rev?.imageUrl && (
                            <img
                            src={`http://localhost:3000${rev.imageUrl}`}
                            alt="Review upload"
                            className="w-full max-h-64 rounded-lg object-contain border"
                            />
                        )}
                        </li>
                    ))}
            </ul>

      </div>

      <div className="mt-6 border-t pt-4">
        <ReviewForm  productId={id}/>
      </div>
    </div>
  );
}
