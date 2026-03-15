import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    border-0 cursor-pointer
  `;
  
  const variantStyles = {
    primary: `
      bg-[#C8050E] text-white
      hover:bg-[#A0040B] hover:text-white
      focus:ring-[#C8050E] focus:text-white
      shadow-md hover:shadow-lg
      active:bg-[#8B0309] active:text-white
    `,
    secondary: `
      bg-gray-600 text-white
      hover:bg-gray-700 hover:text-white
      focus:ring-gray-500 focus:text-white
      shadow-md hover:shadow-lg
      active:bg-gray-800 active:text-white
    `,
    outline: `
      border-2 border-[#C8050E] text-[#C8050E]
      hover:bg-[#C8050E] hover:text-white
      focus:ring-[#C8050E] focus:text-white
      bg-transparent
      active:bg-[#A0040B] active:text-white
    `,
    ghost: `
      text-[#C8050E]
      hover:bg-red-50 hover:text-[#C8050E]
      focus:ring-[#C8050E] focus:text-[#C8050E]
      bg-transparent
      active:bg-red-100 active:text-[#A0040B]
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700 hover:text-white
      focus:ring-red-500 focus:text-white
      shadow-md hover:shadow-lg
      active:bg-red-800 active:text-white
    `
  };
  
  const sizeStyles = {
    sm: `
      px-3 py-2 text-sm
      min-h-[36px] min-w-[80px]
    `,
    md: `
      px-4 py-2.5 text-base
      min-h-[44px] min-w-[100px]
    `,
    lg: `
      px-6 py-3 text-lg
      min-h-[52px] min-w-[120px]
    `
  };

  const combinedStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      className={combinedStyles}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;