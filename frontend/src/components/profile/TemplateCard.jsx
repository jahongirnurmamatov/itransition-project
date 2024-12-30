import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { tableData } from '@/assets/data'
import {  formatDistanceToNow } from 'date-fns';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';

const TemplateCard = () => {
  return (
    <div className='w-full grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-10'>
       {
        tableData.map((item) => (
            <Link to={`/template/4`}>
            <Card className="w-[300px] h-[200px] bg-primary-foreground ">
                <CardHeader>
                     <p className='font-bold'>{item.title}</p>
                 </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-between ">
                <p className="italic">{item.description}</p>
                <p className='text-gray-500 '>{formatDistanceToNow(item.date)}</p>
              </div>
            </CardContent>
            <CardFooter >
                <p className='font-bold'>Responses: <span className='font-light'>4</span> </p>
            </CardFooter>
          </Card>
          </Link>
        ))
       }
    </div>
  )
}

export default TemplateCard