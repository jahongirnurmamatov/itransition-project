import { useTemplateStore } from '@/store/templateStore';
import CardCarousel from './CardCarousel'
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from '@/hooks/use-toast';

const Recent = () => {
  const [templates,setTemplates] = useState([]);
  useEffect(()=>{
    const fetchRecentTemplates = async () => {
      try {
        const templates = await axiosInstance.get('/template/recent');
        setTemplates(templates.data.templates);	
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch recent templates.',
          variant: 'destructive',
        });
      }
    }
    fetchRecentTemplates();
  },[ setTemplates, templates]);
  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center gap-20 justify-center bg-transparent ">
        <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold text-gray-100">Recent Templates</h1>
    <div className="w-[80%] mx-auto flex items-center justify-center">
      <CardCarousel templates={templates}/>
    </div>
  </div>
  )
}

export default Recent