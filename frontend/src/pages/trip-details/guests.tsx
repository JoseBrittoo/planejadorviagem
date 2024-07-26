import { Badge, BadgeCheck, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface Participants {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participants[]>([]);

  // a função só execulta denovo quando o id muda
  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  return (
    <div>
      <div className="space-y-6 ">
        <h2 className="font-semibold text-xl">Convidados</h2>
        <div className="space-y-5">
          {participants.map((participants, index) => {
            return (
              <div key={participants.id} className="flex items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <span className="block font-medium text-zinc-100">
                    {participants.name ?? `Convidado ${index}`}
                  </span>
                  <span className="block text-sm text-zinc-400 truncate">
                    {participants.email}
                  </span>
                </div>
                {participants.is_confirmed ? (
                  <BadgeCheck className="size-5 shrink-0 text-orange-400"/>
                ) : (
                  <Badge className="size-5 shrink-0 text-zinc-400" />
                )}
              </div>
            );
          })}
        </div>

        <Button variant="secondary" size="full">
          <UserCog className="size-5" />
          Gerenciar convidados
        </Button>
      </div>
    </div>
  );
}
