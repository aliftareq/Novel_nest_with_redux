import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import {  useGetReviewsQuery, usePostReviewsMutation } from '@/Redux/Features/Books/BookApi';
import { useAppSelector } from '@/Redux/hook';
import { Link } from 'react-router-dom';

interface IProps {
  id: string;
}

type IReview = {
  userEmail:string,
  review:string
}

export default function ProductReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');

  // getting user
  const  {user} = useAppSelector(state => state.user)

  //function for get reviews
  const { data } = useGetReviewsQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  
  console.log('reviews data', data);


  //function for post reviews
  const [postReviews] = usePostReviewsMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue);

    const options = {
      id: id,
      data: { userEmail:user.email, review: inputValue },
    };

    postReviews(options);
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="max-w-7xl mx-auto mt-5">
      {
        user?.email
        ?
        <>
          <h1 className='text-2xl py-6 font-semibold'>Add Your review about this book here:</h1>
          <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
            <Textarea
              className="min-h-[30px]"
              onChange={handleChange}
              value={inputValue}
            />
            <Button
              type="submit"
              className="rounded-full h-10 w-10 p-2 text-[25px]"
            >
              <FiSend />
            </Button>
          </form>
          <div className="mt-10">
          {data?.Reviews?.map((review: IReview, index: number) => (
            <div key={index} className="flex gap-3 items-center mb-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{review?.review}</p>
            </div>
          ))}
          </div>
        </>
        :
        <>
          <div>
            <h1 className='text-3xl font-semibold'>
              For adding review you have to <Link className='text-blue-500 underline' to='/login'>login</Link> First.
            </h1>
          </div>
        </>
      }
    </div>
  );
}
