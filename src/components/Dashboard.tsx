import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Incident, IncidentType } from "../types/incident";
import { fetchIncidents } from "../services/incidentService";
import { IncidentGrid } from "./IncidentGrid";
import { IncidentFilters } from "./IncidentFilters";
import { toast } from "@/hooks/use-toast";
import { Bell, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [filters, setFilters] = useState({
    search: "",
    types: [] as IncidentType[],
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });

  // Fonction pour générer une clé unique pour un incident
  const getKey = (incident: Incident) =>
    incident.id || `${incident.timestamp}-${incident.message}`;

  // Fonction de fusion : on ajoute uniquement les incidents dont la clé n'existe pas déjà
  const mergeIncidents = (existing: Incident[], fresh: Incident[]): Incident[] => {
    const existingKeys = new Set(existing.map((incident) => getKey(incident)));
    const newIncidents = fresh.filter((incident) => !existingKeys.has(getKey(incident)));
    return [...existing, ...newIncidents];
  };

  // Fonction pour récupérer et intégrer les incidents
  const loadIncidents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchIncidents();

      // console.log("Données reçues :", data);
      setIncidents((prevIncidents) => mergeIncidents(prevIncidents, data));
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Erreur lors du chargement des incidents :", error);
      toast({
        title: "Erreur de chargement",
        description: "Impossible de récupérer les incidents.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Chargement initial et mise en place du polling toutes les 10 secondes
  useEffect(() => {
    loadIncidents();
    // Pour alléger le polling, on pense à suspendre les appels quand l'onglet est inactif (API Page Visibility) plus tard
    const intervalId = setInterval(() => {
      loadIncidents();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [loadIncidents]);

  // Calcul des incidents filtrés grâce à useMemo afin de ne pas stocker cet état en doublon
  const filteredIncidents = useMemo(() => {
    const { search, types, startDate, endDate } = filters;
    let filtered = [...incidents];

    // Filtrage par terme de recherche sur message ou localisation
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (incident) =>
          incident.message.toLowerCase().includes(searchLower) ||
          incident.location.toLowerCase().includes(searchLower)
      );
    }

    // Filtrage par type d'incident
    if (types.length > 0) {
      filtered = filtered.filter((incident) => types.includes(incident.type));
    }

    // Filtrage par date de début
    if (startDate) {
      filtered = filtered.filter(
        (incident) => new Date(incident.timestamp) >= startDate
      );
    }

    // Filtrage par date de fin (en incluant l'intégralité du jour)
    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setDate(endOfDay.getDate() + 1);
      filtered = filtered.filter(
        (incident) => new Date(incident.timestamp) <= endOfDay
      );
    }

    return filtered;
  }, [incidents, filters]);

  // Gestion du changement de filtres (transmis par le composant IncidentFilters)
  const handleFilterChange = (newFilters: {
    search: string;
    types: IncidentType[];
    startDate: Date | undefined;
    endDate: Date | undefined;
  }) => {
    setFilters(newFilters);
  };

  // Rafraîchissement manuel via le bouton "Actualiser"
  const handleRefresh = () => {
    loadIncidents();
  };

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard de Monitoring
          </h1>
          <p className="text-muted-foreground">
            Surveillance des incidents en temps réel
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground mr-2">
            Dernière mise à jour: {lastUpdated.toLocaleTimeString()}
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border shadow-sm p-6 mb-6 flex-grow">
        <IncidentFilters onFilterChange={handleFilterChange} />

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Incidents
            {filteredIncidents.length > 0 && (
              <span className="ml-2 text-muted-foreground text-sm">
                ({filteredIncidents.length})
              </span>
            )}
          </h2>
        </div>

        <IncidentGrid incidents={filteredIncidents} isLoading={isLoading} />
      </div>

      <footer className="mt-auto py-4 text-center text-sm text-muted-foreground border-t">
        <p>
          © 2025 SmartEye - Système intelligent de surveillance ^ Hackathon FRIARE 2025
          | Tous droits réservés
        </p>
      </footer>
    </div>
  );
}
