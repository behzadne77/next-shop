import { Product } from "@/types/product";
import { Star, TrendingUp, Award, Users, ThumbsUp } from "lucide-react";

interface ProductRankingProps {
    product: Product;
}

export default function ProductRanking({ product }: ProductRankingProps) {
    // Calculate ranking metrics
    const totalReviews = product.reviews?.length || 0;
    const averageRating = product.rating;
    const ratingPercentage = (averageRating / 5) * 100;
    
    // Mock ranking data (in real app, this would come from API)
    const categoryRank = Math.floor(Math.random() * 50) + 1;
    const overallRank = Math.floor(Math.random() * 500) + 1;
    const popularityScore = Math.floor(Math.random() * 100) + 1;
    const satisfactionRate = Math.floor(Math.random() * 20) + 80;

    const getRankingColor = (rank: number) => {
        if (rank <= 10) return "text-green-600 bg-green-50";
        if (rank <= 50) return "text-blue-600 bg-blue-50";
        if (rank <= 100) return "text-orange-600 bg-orange-50";
        return "text-gray-600 bg-gray-50";
    };

    const getRankingIcon = (rank: number) => {
        if (rank <= 10) return "🥇";
        if (rank <= 50) return "🥈";
        if (rank <= 100) return "🥉";
        return "📊";
    };

    return (
        <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 rounded-2xl border border-indigo-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <Award className="h-6 w-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">Product Ranking</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Overall Rating */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Overall Rating</span>
                        <span className="text-2xl font-bold text-indigo-600">{averageRating.toFixed(1)}</span>
                    </div>
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
                        <span className="text-sm text-gray-500">({totalReviews} reviews)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${ratingPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Category Ranking */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Category Rank</span>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">{getRankingIcon(categoryRank)}</span>
                            <span className={`text-2xl font-bold px-3 py-1 rounded-full ${getRankingColor(categoryRank)}`}>
                                #{categoryRank}
                            </span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        in {product.category} category
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span>Rising in popularity</span>
                    </div>
                </div>

                {/* Overall Ranking */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Overall Rank</span>
                        <span className={`text-2xl font-bold px-3 py-1 rounded-full ${getRankingColor(overallRank)}`}>
                            #{overallRank}
                        </span>
                    </div>
                    <div className="text-sm text-gray-500">
                        out of 10,000+ products
                    </div>
                    <div className="flex items-center gap-1 text-sm text-blue-600">
                        <Users className="h-4 w-4" />
                        <span>Popular choice</span>
                    </div>
                </div>

                {/* Popularity Score */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Popularity Score</span>
                        <span className="text-2xl font-bold text-purple-600">{popularityScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${popularityScore}%` }}
                        />
                    </div>
                    <div className="flex items-center gap-1 text-sm text-purple-600">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{satisfactionRate}% satisfaction rate</span>
                    </div>
                </div>
            </div>

            {/* Performance Indicators */}
            <div className="mt-6 pt-6 border-t border-indigo-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                        <div className="text-2xl font-bold text-green-600">4.8</div>
                        <div className="text-xs text-gray-500">Quality Score</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-2xl font-bold text-blue-600">92%</div>
                        <div className="text-xs text-gray-500">Recommendation</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-2xl font-bold text-orange-600">Fast</div>
                        <div className="text-xs text-gray-500">Delivery</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
