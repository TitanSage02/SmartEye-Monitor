
import { Incident } from "../types/incident";
import { IncidentCard } from "./IncidentCard";

interface IncidentGridProps {
  incidents: Incident[];
  isLoading: boolean;
}

export function IncidentGrid({ incidents, isLoading }: IncidentGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="rounded-lg border border-border p-4 animate-pulse-subtle"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="w-24 h-6 bg-accent rounded-full"></div>
              <div className="w-32 h-4 bg-accent rounded-full"></div>
            </div>
            <div className="w-3/4 h-6 bg-accent rounded-full mb-4"></div>
            <div className="w-1/2 h-4 bg-accent rounded-full mb-4"></div>
            <div className="w-full h-32 bg-accent rounded-md mb-4"></div>
            <div className="w-full h-9 bg-accent rounded-md"></div>
          </div>
        ))}
      </div>
    );
  }

  if (incidents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p className="text-xl">Aucun incident trouvé</p>
        <p>Aucun incident ne correspond à vos critères de recherche</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {incidents.map((incident) => (
        <IncidentCard key={incident.id} incident={incident} />
      ))}
    </div>
  );
}
