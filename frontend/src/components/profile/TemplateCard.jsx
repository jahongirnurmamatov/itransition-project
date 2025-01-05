import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { tableData } from '@/assets/data'
import {  formatDistanceToNow } from 'date-fns';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';
import { PiFolderSimplePlus } from "react-icons/pi";
import { useSidebar } from '../ui/sidebar';
import HtmlContent from '../htmlparser/HtmlParser';

const TemplateCard = ({templates,userId,d}) => {
    const {open} = useSidebar();
  return (
    <div className={`grid gap-4 ${open ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
       {
        templates?.map((item) => (
            <Link key={item.id} to={`/templates/${item.id}`}>
            <Card className="w-[300px] h-[200px] bg-primary-foreground ">
                <CardHeader>
                     <p className='font-bold'>{item.title}</p>
                 </CardHeader>
            <CardContent className='flex justify-between  flex-col'>
                <HtmlContent content={item.description} />
                <p className='text-gray-500 '>{formatDistanceToNow(item.createdAt)} ago</p>
            </CardContent>
            <CardFooter >
                <p className='font-bold'>{d.responses} <span className='font-light'>{item.responses.length}</span> </p>
            </CardFooter>
          </Card>
          </Link>
        ))
       }
       <Link to={`/users/:id/user-templates?userId=${userId}`}>
            <Card className="w-[300px] h-[200px] bg-primary-foreground flex items-center justify-center">
            <CardContent className=''>
              <div className='flex gap-4 text-gray-500'>
                <p className='font-bold'>{d.browseMore}</p>
                <PiFolderSimplePlus className='text-2xl' />
              </div>
            </CardContent>
          </Card>
        </Link>
    </div>
  )
}

export default TemplateCard