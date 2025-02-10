export function Button({ children, variant, className, ...props }) {
    const baseStyle = "rounded-lg px-4 py-2 font-semibold focus:outline-none";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    };
  
    const variantStyle = variants[variant] || variants.primary;
  
    return (
      <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
        {children}
      </button>
    );
  }