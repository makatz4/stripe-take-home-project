export function Button({ children, variant, className, ...props }) {
    const baseStyle = "rounded-lg px-4 py-2 font-semibold focus:outline-none";
    const variants = {
      primary: "bg-violet-400 text-black hover:bg-violet-300",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    };
  
    const variantStyle = variants[variant] || variants.primary;
  
    return (
      <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
        {children}
      </button>
    );
  }