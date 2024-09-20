export type User = {
    id: number;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
  };
  
  export interface JwtPayload {
    userId: number;
  }
  