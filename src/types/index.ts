export interface Flower {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface FlowerFormInput {
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface FlowerCardProps {
  flower: Flower;
}

export interface FlowerItemProps {
  flower: Flower;
  onEdit: (flower: Flower) => void;
  onDelete: (id: string) => void;
  disabled: boolean;
}

// ==========================================
// TODO SSR 1: Define the Announcement interface with id, title, message, and type ("info" | "warning" | "success")
// ==========================================


