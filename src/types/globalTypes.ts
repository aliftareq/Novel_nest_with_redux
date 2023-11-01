export type IBook = {
  _id: string;
  Title: string;
  Author: string;
  Genre: string;
  PublicationDate: string;
  Availability: boolean;
  Image: string;
  BookState?: boolean;
  Reviews: {
    userId: string;
    review: string;
  }[];
};
