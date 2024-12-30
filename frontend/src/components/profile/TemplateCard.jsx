import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { tableData } from '@/assets/data'
import {  formatDistanceToNow } from 'date-fns';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';
import { PiFolderSimplePlus } from "react-icons/pi";
import { useSidebar } from '../ui/sidebar';

const TemplateCard = () => {
    const {open} = useSidebar();
  return (
    <div className={`grid gap-4 ${open ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
       {
        tableData.map((item) => (
            <Link to={`/template/4`}>
            <Card className="w-[300px] h-[200px] bg-primary-foreground ">
                <CardHeader>
                     <p className='font-bold'>{item.title}</p>
                 </CardHeader>
            <CardContent className='flex justify-between  flex-col'>
                <p className="italic">{item.description}</p>
                <p className='text-gray-500 '>{formatDistanceToNow(item.date)} ago</p>
            </CardContent>
            <CardFooter >
                <p className='font-bold'>Responses: <span className='font-light'>4</span> </p>
            </CardFooter>
          </Card>
          </Link>
        ))
       }
       <Link to={`url-to-templates-of-user`}>
            <Card className="w-[300px] h-[200px] bg-primary-foreground flex items-center justify-center">
            <CardContent className=''>
              <div className='flex gap-4 text-gray-500'>
                <p className='font-bold'>Browse more ...</p>
                <PiFolderSimplePlus className='text-2xl' />
              </div>
            </CardContent>
          </Card>
        </Link>
    </div>
  )
}

export default TemplateCard