/* eslint-disable react-hooks/rules-of-hooks */
import { usePostBookMutation } from '@/Redux/Features/Books/BookApi';
import { useAppSelector } from '@/Redux/hook';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, FormEvent, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import toast, { Toaster } from 'react-hot-toast';

export default function AddNewBook() {

  // getting user
  const  {user} = useAppSelector(state => state.user)

  //genre list
  const genre = ['Fiction', 'Dystopian Fiction', 'Fantasy', 'Romance', 'Adventure']

  const [Title, setTitle] = useState<string>('');
  const [Author, setAuthor] = useState<string>('');
  const [Genre, setGenre] = useState<string>('');
  const [PublicationDate, setPublicationDate] = useState<number>(0);
  const [Image, setImage] = useState<string>('');

  //function for post reviews
  const [postBook, { data }] = usePostBookMutation();
  console.log(data);

  // adding a toast 
  if(data?.acknowledged){
    toast.success('Successfully Added to the booklist!')
  }
  // adding books function
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      Title,
      Author,
      Genre,
      PublicationDate,
      Image,
      Reviews:[],
      bookOwner: user?.email
    };
    console.log('book data', data);

    //adding book in db by api calling.
    postBook(data);

    //re-setting the values after posting
    setTitle('')
    setAuthor('')
    setGenre('')
    setPublicationDate(0)
    setImage('')

  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleAuthor = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };
  const handleGenre = (value: string) => {
    setGenre(value);
  };
  const handlePublicationDate = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue !== '') {
      const intValue = parseInt(inputValue, 10);
      setPublicationDate(intValue);
    }
  };
  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
      <div><Toaster/></div>
      <div className="max-w-6xl w-full">
        <h1 className="text-5xl font-semibold text-center my-5">Add Your Book details here.</h1>
        {/* form data here */}
        <form onSubmit={handleSubmit}>
          <div className="h-[60vh] border border-gray-300 rounded-md p-10 overflow-auto">
            <div className="flex gap-5">
              <div className="w-full space-y-5">
                <div>
                  <Label htmlFor="Title">Title</Label>
                  <Input type="text" id="Title" className="mt-2" 
                    onChange={handleTitle}
                    value={Title}
                  />
                </div>
                <div>
                  <Label htmlFor="Author">Author</Label>
                  <Input type="text" id="Author" className="mt-2" 
                    onChange={handleAuthor}
                    value={Author}
                  />
                </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="Genre">Genre</Label>
                <Select onValueChange={handleGenre}>
                  <SelectTrigger>
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      genre.map((item:string)=> (<SelectItem value={item}>{item}</SelectItem>))
                    }
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="PublicationDate">Publication Date</Label>
                <Input type="text" id="PublicationDate" className="mt-2" 
                  onChange={handlePublicationDate} 
                  value={PublicationDate}
                />
              </div>
            </div>
            </div>
            <div className="mt-5">
              <Label htmlFor="name">Image Link</Label>
              <Input type="text" id="name" className="mt-2" onChange={handleImage} value={Image}
              />
            </div>
            <div className='mt-5 flex justify-center'>
              <Button type="submit" className='w-1/2 bg-green-400 hover:bg-green-500' variant='outline'>
                Add
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
