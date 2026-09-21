import React from "react";
import { useAuthStore } from "../../core/auth/useAuthStore";
import { Modal } from "../../core/ui/Modal";
import { mockCalendarEvents } from "../../mocks/data";
import { Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "../../core/ui/Badge";

export const CalendarioModal: React.FC = () => {
  const { isCalendarModalOpen, toggleCalendarModal } = useAuthStore();

  return (
    <Modal
      isOpen={isCalendarModalOpen}
      onClose={() => toggleCalendarModal(false)}
      title="Calendário Acadêmico Unificado"
    >
      <div className="space-y-3">
        {mockCalendarEvents.map((ev) => (
          <div
            key={ev.id}
            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
          >
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-5 h-5 text-blue-900" />
              <div>
                <span className="text-xs font-bold text-slate-500 block">
                  {ev.date}
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {ev.title}
                </span>
              </div>
            </div>
            <Badge level="NEUTRO" text={ev.type} />
          </div>
        ))}
      </div>
    </Modal>
  );
};
