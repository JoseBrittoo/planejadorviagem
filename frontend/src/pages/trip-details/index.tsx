import {
  Plus,
} from "lucide-react";

import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { Guests } from "./guests";
import { Activities } from "./activity";
import { DestinationAndDateHeader } from "./destination-and-date-header";
// import { Button } from "react-day-picker";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  return (
    <div className="max-w-6x1 px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button 
              onClick={openCreateActivityModal}
              className="bg-orange-500 text-blue-100 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-orange-950"
            >
              <Plus className="size-5" />
              Cadastrar atividade
            </button>
          </div>

          {/* atividades */}
          <Activities  />
        </div>

        <div className="w-80 space-y-6">
          {/* lista de convidados */}
          <Guests />
          <div className="w-full h-px bg-zinc-800" />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}
