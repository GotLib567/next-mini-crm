const Button = ({ className = "", children, onClick, variant = "solid", size = "md" }) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900";
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3",
  };
  const variants = {
    solid: "bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-400",
    ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
    soft: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
    primary: "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-300",
  };
  return (
    <button onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;