import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import {  useGetReviewsQuery, usePostReviewsMutation } from '@/Redux/Features/Books/BookApi';

interface IProps {
  id: string;
}

type IReview = {
  userId:string,
  review:string
}

export default function ProductReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');

  //function for get reviews
  const { data } = useGetReviewsQuery(id, {
    refetchOnMountOrArgChange: true,
    // pollingInterval: 10000,
  });
  
  console.log('reviews data', data);


  //function for post reviews
  const [postReviews] = usePostReviewsMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue);

    const options = {
      id: id,
      data: { userId:'user001', review: inputValue },
    };

    postReviews(options);
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="max-w-7xl mx-auto mt-5">
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
    </div>
  );
}
