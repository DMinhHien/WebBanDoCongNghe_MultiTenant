export interface Comment {
    id: string;
    content:string;
    username:string;
    productId: string;
    rating: number;
    date: Date;
  }
  export interface CommentDTO {
    id: string;
    content:string;
    userId:string;
    productId: string;
    rating: number;
    date: Date;
  }