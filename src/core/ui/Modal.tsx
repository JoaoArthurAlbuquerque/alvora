// src/core/ui/Modal.tsx
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#16232E]/40 backdrop-blur-xs z-50 transition-opacity" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg bg-white border border-[#16232E]/15 rounded-[var(--radius-card)] p-6 z-50 shadow-xl focus:outline-none">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Dialog.Title className="text-xl font-display font-semibold text-[#0B3D66]">
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="text-sm text-[#4A5A68] mt-1">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close asChild>
              <button
                aria-label="Fechar janela"
                className="p-1 rounded-[var(--radius-control)] text-[#4A5A68] hover:bg-[#FAF7F2] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
