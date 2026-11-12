export interface Review {
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit?: number;
  capacity?: number;
  location: string;
  imageUrl: string;
  images?: string[];
  status?: string;
  amenities?: string[];
  description?: string;
  ownerEmail?: string;
  ownerName?: string;
  reviews?: Review[];
  createdAt?: string;
}