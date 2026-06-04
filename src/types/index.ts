export type FlowerCategory = "all" | "Roses" | "Lilies" | "Tulips" | "Sunflowers";

export interface Flower {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface FlowerFormInput {
  name: string;
  price: number;
  category: string;
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
