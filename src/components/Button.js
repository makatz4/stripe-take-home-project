export function Button({ children, variant, className, loading, disabled, ...props }) {
  const baseStyle = "rounded-lg px-4 py-2 font-semibold focus:outline-none";
  const variants = {
    primary: "bg-violet-400 text-black hover:bg-violet-300",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  const disabledStyle = "bg-gray-400 text-gray-700 cursor-not-allowed";

  const variantStyle = disabled ? disabledStyle : variants[variant] || variants.primary;

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className} ${
        loading ? "cursor-not-allowed opacity-70" : ""
      }`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 2.623 1.053 5.01 2.758 6.708l1.242-1.417z"
            ></path>
          </svg>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
