// src/modules/calendario/CalendarioModal.tsx
import React from "react";
import { Modal } from "../../core/ui/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarioModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Calendário Acadêmico 2026">
      <div className="space-y-3">
        <div className="p-3 rounded-xl bg-[#5170FF]/10 text-[#5170FF] flex justify-between items-center text-xs font-bold">
          <span>25 de Setembro, 2026</span>
          <span>Início de Entregas Parciais</span>
        </div>
        <div className="p-3 rounded-xl bg-[#5170FF]/5 text-slate-700 flex justify-between items-center text-xs font-medium">
          <span>15 de Outubro, 2026</span>
          <span>Avaliação Geral do Semestre</span>
        </div>
      </div>
    </Modal>
  );
};
