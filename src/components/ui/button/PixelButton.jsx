import React from 'react';

/**
 * Pixel art style button component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {string} props.variant - Button variant (default, outline)
 */
const PixelButton = ({ 
  children, 
  onClick, 
  className = '', 
  type = 'button',
  size = 'md',
  variant = 'default',
  ...rest 
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    default: 'bg-poker-red hover:bg-red-700 text-white border-2 border-black',
    outline: 'bg-transparent hover:bg-green-800 text-white border-2 border-white'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`pixel-button ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PixelButton; 