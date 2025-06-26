
import React, { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  titleColor?: string;
  bgColor?: string;
  borderColor?: string;
  children: ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ 
  title, 
  titleColor = 'text-gray-800', 
  bgColor = 'bg-gray-50', 
  borderColor = 'border-gray-200', 
  children 
}) => {
  return (
    <div className={`${bgColor} p-6 rounded-xl shadow-md border ${borderColor}`}>
      <h3 className={`text-2xl font-bold ${titleColor} mb-4`}>{title}</h3>
      {children}
    </div>
  );
};
