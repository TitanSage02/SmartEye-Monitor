
import { useState } from "react";
import { Incident } from "../types/incident";
import { formatRelativeTime, formatDateTime } from "../utils/dateUtils";
import { 
  AlertTriangle, 
  Flame, 
  Swords, 
  MapPin, 
  Clock, 
  Maximize2 
} from "lucide-react";
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface IncidentCardProps {
  incident: Incident;
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const { type, timestamp, location, message, image } = incident;
  
  // Function to get icon based on incident type
  const getTypeIcon = () => {
    switch (type) {
      case "fire":
        return <Flame className="h-5 w-5 text-fire" />;
      case "accident":
        return <AlertTriangle className="h-5 w-5 text-accident" />;
      case "violence":
        return <Swords className="h-5 w-5 text-violence" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  // Function to get badge color based on incident type
  const getTypeClass = () => {
    switch (type) {
      case "fire":
        return "bg-fire text-white";
      case "accident":
        return "bg-accident text-white";
      case "violence":
        return "bg-violence text-white";
      default:
        return "";
    }
  };

  // Function to get translated incident type
  const getTypeLabel = () => {
    switch (type) {
      case "fire":
        return "Incendie";
      case "accident":
        return "Accident";
      case "violence":
        return "Violence";
      default:
        return type;
    }
  };

  return (
    <Card className={`incident-card incident-card-${type}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Badge className={getTypeClass()}>
            {getTypeIcon()}
            <span className="ml-1">{getTypeLabel()}</span>
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span title={formatDateTime(timestamp)}>{formatRelativeTime(timestamp)}</span>
          </div>
        </div>
        <CardTitle className="text-lg font-medium mt-2">{message}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        
        {image && (
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative group overflow-hidden rounded-md cursor-pointer">
                <img 
                  src={image} 
                  alt={`Incident: ${message}`} 
                  className="w-full h-32 object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="h-8 w-8 text-white" />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <img 
                src={image} 
                alt={`Incident: ${message}`} 
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="mt-2">
                <p className="font-medium">{message}</p>
                <p className="text-sm text-muted-foreground">{location} - {formatDateTime(timestamp)}</p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">Voir les détails</Button>
      </CardFooter>
    </Card>
  );
}
