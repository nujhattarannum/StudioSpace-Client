export interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit?: number;
  capacity?: number;
  location: string;
  imageUrl: string;
  amenities?: string[];
  description?: string;
  ownerEmail?: string;
  ownerName?: string;
}