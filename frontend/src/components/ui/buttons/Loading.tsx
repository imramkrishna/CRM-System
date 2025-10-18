interface messageProps {
  message?: string;
}

const Loading = ({ message }: messageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      {/* Professional spinner */}
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-3 border-gray-200"></div>
        
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-blue-600 border-r-blue-600 animate-spin"></div>
      </div>
      
      {/* Loading text */}
      {message ? (
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-gray-700">Loading {message}</p>
          <p className="text-xs text-gray-500">Please wait...</p>
        </div>
      ) : (
        <p className="text-sm font-medium text-gray-700">Loading...</p>
      )}
      
      {/* Progress dots */}
      <div className="flex gap-1.5">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default Loading;