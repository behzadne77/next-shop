import { Product } from "@/types/product";
import { Star, Calendar, MoreVertical } from "lucide-react";
interface ProductCommentsProps {
    product: Product;
}

export default function ProductComments({ product }: ProductCommentsProps) {

    const reviews = product?.reviews || [];
    const averageRating = product?.rating;
    const totalReviews = reviews.length;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="space-y-6">
            {product && (
                <>
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-5 w-5 ${
                                                star <= averageRating
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-lg font-semibold text-gray-900">
                                    {averageRating.toFixed(1)}
                                </span>
                            </div>
                            <span className="text-gray-500">({totalReviews} reviews)</span>
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="h-8 w-8 text-gray-400" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h4>
                            <p className="text-gray-500">Be the first to review this product!</p>
                        </div>
                    ) : (
                        reviews.map((review, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur ring-1 ring-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/5 via-sky-400/5 to-cyan-300/5 blur-2xl"></div>
                                
                                <div className="relative z-[1] p-6">
                                    {/* Review Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                {getInitials(review.reviewerName)}
                                            </div>
                                            <div>
                                                <h5 className="font-semibold text-gray-900">{review.reviewerName}</h5>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{formatDate(review.date)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded-lg">
                                            <MoreVertical className="h-4 w-4 text-gray-400" />
                                        </button>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`h-4 w-4 ${
                                                        star <= review.rating
                                                            ? "text-yellow-400 fill-current"
                                                            : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">
                                            {review.rating} out of 5
                                        </span>
                                    </div>

                                    {/* Comment */}
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        {review.comment}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                </>
            )}
        </div>
    );
}
