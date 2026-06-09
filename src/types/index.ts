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

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
}

