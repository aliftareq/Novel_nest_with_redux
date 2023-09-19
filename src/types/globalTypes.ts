export type IBook = {
  _id: number;
  Title: string;
  Author: string;
  Genre: string;
  PublicationDate: string;
  Availability: boolean;
  Image: string;
  Reviews: {
    userId: string;
    review: string;
  }[];
};
