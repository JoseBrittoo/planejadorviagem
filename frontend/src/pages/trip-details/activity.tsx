import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import jsPDF from "jspdf";

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export function Activities() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  // a função só execulta denovo quando o id muda
  useEffect(() => {
    api
      .get(`trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities));
  }, [tripId]);

  // gerar pdf das atividades cadastradas
  const generatePDF = () => {
    const pdf = new jsPDF();

    // Adicionando título ao PDF
    pdf.setFontSize(18);
    pdf.text("Atividades Cadastradas", 20, 20);

    let yOffset = 30;

    activities.forEach((category) => {
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 255);
      pdf.text(
        `Dia ${format(new Date(category.date), "d")} - ${format(
          new Date(category.date),
          "EEEE",
          { locale: ptBR }
        )}`,
        20,
        yOffset
      );
      yOffset += 10;

      if (category.activities.length > 0) {
        category.activities.forEach((activity) => {
          pdf.setFontSize(12);
          pdf.setTextColor(0, 0, 0);
          pdf.text(
            `- ${activity.title} às ${format(
              new Date(activity.occurs_at),
              "HH:mm"
            )}h`,
            20,
            yOffset
          );
          yOffset += 10;
        });
      } else {
        pdf.setFontSize(12);
        pdf.setTextColor(150, 150, 150);
        pdf.text("Nenhuma atividade cadastrada nessa data.", 20, yOffset);
        yOffset += 10;
      }

      yOffset += 10;
    });

    const pdfBlob = pdf.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  };

  return (
    <div>
      <div id="activities" className="space-y-8">
        {activities.map((category) => {
          return (
            <div key={category.date} className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">
                  Dia {format(category.date, "d")}
                </span>
                <span className="text-xs text-zinc-500">
                  {format(category.date, "EEEE", { locale: ptBR })}
                </span>
              </div>
              {category.activities.length > 0 ? (
                <div>
                  {category.activities.map((activity) => {
                    return (
                      <div key={activity.id} className="space-y-2.5">
                        <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                          <CircleCheck className="size-5 text-orange-400" />
                          <span className="text-zinc-100">
                            {activity.title}
                          </span>
                          <span className="text-zinc-400 text-sm ml-auto">
                            {format(activity.occurs_at, "HH:mm")}h
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-zinc-500 text-sm">
                  Nenhuma atividade cadastrada nessa data.
                </p>
              )}
            </div>
          );
        })}
        <button
          onClick={generatePDF}
          className="bg-orange-500 text-blue-100 space-y-2.5 rounded-lg px-5 py-2 font-medium flex items-center hover:bg-orange-950"
        >
          Gerar PDF das atividades
        </button>
      </div>
    </div>
  );
}
