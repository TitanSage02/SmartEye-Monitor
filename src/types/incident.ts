
export type IncidentType = 'accident' | 'fire' | 'violence';

export interface Incident {
  id: string;
  timestamp: string;
  type: IncidentType;
  location: string;
  message: string;
  image: string; // base64 encoded image
}
