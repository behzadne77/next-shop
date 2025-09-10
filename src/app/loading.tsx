export default function GlobalLoading() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center space-y-6">
                {/* Logo/Icon */}
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-lg animate-pulse" />
                </div>
                
                {/* Loading Text */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
                    <p className="text-gray-500">Please wait while we prepare everything for you</p>
                </div>
                
                {/* Loading Animation */}
                <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
            </div>
        </div>
    );
}
