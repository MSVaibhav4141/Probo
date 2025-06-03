export function Button({ children, onClick, className = '', variant = 'default', size = 'md' }: any) {
  const base = 'rounded px-3 py-1 text-sm';
  const variants: any = {
    default: 'bg-blue-600 text-white',
    secondary: 'bg-gray-200 text-black',
    outline: 'border border-gray-400 text-gray-800 bg-white'
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>{children}</button>
  );
}
