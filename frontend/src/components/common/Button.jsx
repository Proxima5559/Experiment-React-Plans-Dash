import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size,
  type = 'button',
  onClick,
  loading = false,
  disabled = false,
  rounded = false,
  fullWidth = false,
  className = '',
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    size ? `btn-${size}` : '',
    rounded ? 'rounded-pill' : '',
    fullWidth ? 'w-100' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
