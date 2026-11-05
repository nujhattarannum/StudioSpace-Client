export interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit?: number;
  capacity?: number;
  location: string;
  imageUrl: string;
  status?: string;
  amenities?: string[];
  description?: string;
  ownerEmail?: string;
  ownerName?: string;
}