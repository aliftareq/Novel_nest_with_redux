/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '@/components/ui/button';
import { DatePickerWithPresets } from '@/components/ui/datePickerWithPreset';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { IBook } from '@/types/globalTypes';
import { useState } from 'react';

export default function AddNewBook() {
  const [scheduled, setScheduled] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
      <div className="max-w-6xl w-full">
        <h1 className="text-5xl font-semibold text-center my-5">Add Your Book details here.</h1>
        {/* form data here */}
        <div className="h-[60vh] border border-gray-300 rounded-md p-10 overflow-auto">
          <div className="flex gap-5">
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="Title">Title</Label>
                <Input type="text" id="Title" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="Author">Author</Label>
                <Input type="text" id="Author" className="mt-2" />
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="Genre">Genre</Label>
                <Input type="text" id="Genre" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="PublicationDate">Publication Date</Label>
                <Input type="text" id="PublicationDate" className="mt-2" />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Label htmlFor="name">Image Link</Label>
            <Input type="text" id="name" className="mt-2" />
          </div>
          <div className='mt-5 flex justify-center'>
            <Button className='w-1/2 bg-green-400 hover:bg-green-500' variant='outline'>Add</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
