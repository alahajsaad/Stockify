// Card.tsx
import React from "react";

export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-white border rounded-lg shadow-sm mb-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-indigo-50/50 flex flex-col p-6 space-y-1.5 ${className}`}>
      {children}
    </div>
  );
};

export const CardBody: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={` p-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`border-t px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};
