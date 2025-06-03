import React from 'react';

export function Tabs({
  value,
  onValueChange,
  children,
  className = '',
}: {
  value: string;
  onValueChange: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-gray-100 py-2 px-4 ${className}`}>
      <div className="flex gap-6 border-b border-gray-300">{children}</div>
    </div>
  );
}

export function Tab({
  value,
  isActive,
  onClick,
  children,
  className = '',
}: {
  value: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`pb-2 text-sm ${
        isActive
          ? 'font-semibold text-black border-b-[2px] border-black'
          : 'text-gray-500'
      } ${className}`}
    >
      {children}
    </button>
  );
}
