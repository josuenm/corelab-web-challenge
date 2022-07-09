export interface IVehicle {
  id: string;
  _id: string;
  name: string;
  description: string;
  plate: string;
  isFavorite: boolean;
  year: number;
  color: string;
  price: number;
  createdAt: Date;
}


export interface IVehicleDTO {
  name: string;
  brand: string;
  color: string;
  year: number;
  plate: string;
}