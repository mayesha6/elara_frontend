"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { X, Building2, User, ArrowRight } from "lucide-react";

interface AccountTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountTypeModal({
  isOpen,
  onClose,
}: AccountTypeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-100 transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Choose Account Type</h2>
          <p className="text-sm text-gray-500 mt-1">
            Select how you would like to sign up for Elara
          </p>
        </div>

        {/* Choices */}
        <div className="space-y-4">
          <Link
            href="/register?name=ORGANIZATION"
            onClick={onClose}
            className="group flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-[#eff6ff] transition-all duration-200 shadow-sm"
          >
            <div className="p-3 bg-orange-100 group-hover:bg-primary group-hover:text-white text-primary rounded-lg transition-colors shrink-0">
              <Building2 size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  Create Organization Account
                </h3>
                <ArrowRight
                  size={18}
                  className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                For companies and HR teams managing employee recognition & rewards.
              </p>
            </div>
          </Link>

          <Link
            href="/register"
            onClick={onClose}
            className="group flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-[#eff6ff] transition-all duration-200 shadow-sm"
          >
            <div className="p-3 bg-orange-100 group-hover:bg-primary group-hover:text-white text-primary rounded-lg transition-colors shrink-0">
              <User size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  Create Individual Account
                </h3>
                <ArrowRight
                  size={18}
                  className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                For individuals and independent team members getting started.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
