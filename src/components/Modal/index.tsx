import React, { useEffect } from "react";

export interface ModalProps {
  open: boolean;
  title: string;
  message: string | React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
  showCloseButton?: boolean;
  showFooter?: boolean;
}

const Modal = ({
  open,
  title,
  message,
  onClose = () => {},
  onConfirm = () => {},
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  showCloseButton = true,
  showFooter = true,
}: ModalProps) => {
  
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const confirmButtonClass =
    variant === "danger"
      ? "bg-[#e67c74] hover:bg-[#d46b63] focus:ring-[#f8b4ae]"
      : "bg-[#e67c74] hover:bg-[#e67c74] focus:ring-[#f8b4ae]";

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto animate-in fade-in-50 zoom-in-90 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between py-3 px-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Footer */}
        {showFooter ? (
          <div className="flex justify-end space-x-3 py-3 px-6 border-t border-gray-200">
            {showCloseButton ? (
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 cursor-pointer"
              >
                {cancelText}
              </button>
            ) : null}
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${confirmButtonClass} cursor-pointer`}
            >
              {confirmText}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
