export interface PointModel {
  id: string;
  name: string;
  description: string;
  category: string;
  position: [number, number];
  images: string[];
  rating: number;
  reviews: number;
}
