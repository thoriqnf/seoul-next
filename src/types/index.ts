export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  role: "admin" | "editor" | "user";
}

export interface SessionData {
  user: AuthUser;
  token: string;
}

// ==========================================
// TODO Context 1: Define the Notification interface
// A notification needs an id (to dismiss it), a message, a type, and a read flag
// 'read' lets us derive the unread badge count without extra state
// ==========================================
// export interface Notification {
//   id: string;
//   message: string;
//   type: "success" | "error" | "info";
//   read: boolean;
// }

// ==========================================
// TODO Context 12: Define the Toy interface
// This matches the shape of data returned by json-server from db.json
// ==========================================
// export interface Toy {
//   id: number;
//   name: string;
//   price: number;
//   emoji: string;
//   description: string;
// }

// ==========================================
// TODO Context 13: Define CartItem — extends Toy and adds a quantity field
// Using 'extends' means CartItem inherits all Toy fields automatically
// ==========================================
// export interface CartItem extends Toy {
//   quantity: number;
// }
