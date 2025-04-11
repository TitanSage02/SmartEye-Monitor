
import { useState } from "react";
import { IncidentType } from "../types/incident";
import { Check, Filter, Search, X, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface IncidentFiltersProps {
  onFilterChange: (filters: {
    search: string;
    types: IncidentType[];
    startDate: Date | undefined;
    endDate: Date | undefined;
  }) => void;
}

export function IncidentFilters({ onFilterChange }: IncidentFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<IncidentType[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const incidentTypes: { value: IncidentType; label: string }[] = [
    { value: "accident", label: "Accident" },
    { value: "fire", label: "Incendie" },
    { value: "violence", label: "Violence" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({
      search: e.target.value,
      types: selectedTypes,
      startDate,
      endDate,
    });
  };

  const handleTypeToggle = (type: IncidentType) => {
    const newSelectedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    
    setSelectedTypes(newSelectedTypes);
    onFilterChange({
      search,
      types: newSelectedTypes,
      startDate,
      endDate,
    });
  };

  const handleDateChange = (date: Date | undefined, isStart: boolean) => {
    if (isStart) {
      setStartDate(date);
      onFilterChange({
        search,
        types: selectedTypes,
        startDate: date,
        endDate,
      });
    } else {
      setEndDate(date);
      onFilterChange({
        search,
        types: selectedTypes,
        startDate,
        endDate: date,
      });
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedTypes([]);
    setStartDate(undefined);
    setEndDate(undefined);
    onFilterChange({
      search: "",
      types: [],
      startDate: undefined,
      endDate: undefined,
    });
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un incident..."
            value={search}
            onChange={handleSearchChange}
            className="pl-8"
          />
          {search && (
            <button 
              onClick={() => {
                setSearch("");
                onFilterChange({
                  search: "",
                  types: selectedTypes,
                  startDate,
                  endDate,
                });
              }}
              className="absolute right-2 top-2.5"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filtres</span>
              {(selectedTypes.length > 0 || startDate || endDate) && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                  {selectedTypes.length + (startDate ? 1 : 0) + (endDate ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {incidentTypes.map((type) => (
                <DropdownMenuItem
                  key={type.value}
                  onClick={() => handleTypeToggle(type.value)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2 flex-1">
                    {selectedTypes.includes(type.value) ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <div className="w-4" />
                    )}
                    <span>{type.label}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Période</span>
              {(startDate || endDate) && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                  {(startDate ? 1 : 0) + (endDate ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium mb-2">De</h4>
                <CalendarComponent
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => handleDateChange(date, true)}
                  initialFocus
                />
              </div>
              <div>
                <h4 className="font-medium mb-2">À</h4>
                <CalendarComponent
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => handleDateChange(date, false)}
                  initialFocus
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {(search || selectedTypes.length > 0 || startDate || endDate) && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
            <X className="h-4 w-4" />
            <span>Effacer</span>
          </Button>
        )}
      </div>

      {/* Active filters */}
      {(selectedTypes.length > 0 || startDate || endDate) && (
        <div className="flex flex-wrap gap-2">
          {selectedTypes.map((type) => (
            <Badge key={type} variant="secondary" className="gap-1">
              {type === "fire" ? "Incendie" : type === "accident" ? "Accident" : "Violence"}
              <button
                onClick={() => handleTypeToggle(type)}
                className="ml-1 rounded-full hover:bg-accent p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {startDate && (
            <Badge variant="secondary" className="gap-1">
              Après {startDate.toLocaleDateString()}
              <button
                onClick={() => handleDateChange(undefined, true)}
                className="ml-1 rounded-full hover:bg-accent p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {endDate && (
            <Badge variant="secondary" className="gap-1">
              Avant {endDate.toLocaleDateString()}
              <button
                onClick={() => handleDateChange(undefined, false)}
                className="ml-1 rounded-full hover:bg-accent p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
