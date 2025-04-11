
import { useState, useEffect, useCallback } from "react";
import { Incident, IncidentType } from "../types/incident";
import { fetchIncidents } from "../services/incidentService";
import { IncidentGrid } from "./IncidentGrid";
import { IncidentFilters } from "./IncidentFilters";
import { toast } from "@/hooks/use-toast";
import { Bell, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [filters, setFilters] = useState({
    search: "",
    types: [] as IncidentType[],
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });

  // Function to fetch incidents
  const loadIncidents = useCallback(async (showToast = false) => {
    setIsLoading(true);
    try {
      const data = await fetchIncidents();
      setIncidents(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error loading incidents:", error);
      toast({
        title: "Erreur de chargement",
        description: "Impossible de récupérer les incidents.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadIncidents();
    
    // Set up polling every 5 seconds
    const intervalId = setInterval(() => {
      loadIncidents(false);
    }, 5000);
    
    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [loadIncidents]);

  // Apply filters when incidents or filters change
  useEffect(() => {
    const { search, types, startDate, endDate } = filters;
    
    let filtered = [...incidents];
    
    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (incident) =>
          incident.message.toLowerCase().includes(searchLower) ||
          incident.location.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by incident types
    if (types.length > 0) {
      filtered = filtered.filter((incident) => types.includes(incident.type));
    }
    
    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(
        (incident) => new Date(incident.timestamp) >= startDate
      );
    }
    
    if (endDate) {
      // Add one day to include the end date fully
      const endOfDay = new Date(endDate);
      endOfDay.setDate(endOfDay.getDate() + 1);
      
      filtered = filtered.filter(
        (incident) => new Date(incident.timestamp) <= endOfDay
      );
    }
    
    setFilteredIncidents(filtered);
  }, [incidents, filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: {
    search: string;
    types: IncidentType[];
    startDate: Date | undefined;
    endDate: Date | undefined;
  }) => {
    setFilters(newFilters);
  };

  // Manual refresh handler
  const handleRefresh = () => {
    loadIncidents(true);
  };

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard de Monitoring</h1>
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
        
        <IncidentGrid 
          incidents={filteredIncidents} 
          isLoading={isLoading} 
        />
      </div>

      <footer className="mt-auto py-4 text-center text-sm text-muted-foreground border-t">
        <p>© 2025 SmartEye - Système intelligent de surveillance ^ Hackathon FRIARE 2025 | Tous droits réservés</p>
      </footer>
    </div>
  );
}
