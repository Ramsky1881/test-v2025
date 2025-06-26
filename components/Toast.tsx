
import React, { useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from './Icons'; // Assuming you have these icons

export const Toast: React.FC<{ toast: import('../types').ToastMessage; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration || 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast, onDismiss]);

  const baseClasses = "fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white px-6 py-3 rounded-xl shadow-xl z-50 text-lg flex items-center animate-fade-in-up-toast";
  let specificClasses = "";
  let IconComponent;

  switch (toast.type) {
    case 'success':
      specificClasses = "bg-green-600";
      IconComponent = CheckCircleIcon;
      break;
    case 'error':
      specificClasses = "bg-red-600";
      IconComponent = XCircleIcon;
      break;
    case 'info':
    default:
      specificClasses = "bg-blue-600";
      IconComponent = InformationCircleIcon;
      break;
  }

  return (
    <div className={`${baseClasses} ${specificClasses}`}>
      {IconComponent && <IconComponent className="w-6 h-6 mr-2" />}
      <span>{toast.message}</span>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;
  
  // Display only the latest toast, or manage multiple toasts display
  // For simplicity, showing latest. Original HTML showed one at a time.
  const latestToast = toasts[toasts.length - 1];

  return <Toast key={latestToast.id} toast={latestToast} onDismiss={removeToast} />;
};
