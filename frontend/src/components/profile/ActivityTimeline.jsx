import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { FaComments } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { LuLayoutTemplate } from "react-icons/lu";
import { HiTemplate } from "react-icons/hi";

import { useActivityStore } from '@/store/activityStore';
import { useEffect } from 'react';
import {  formatDistanceToNow } from 'date-fns';


const getIcon = (type) => {
  switch (type) {
    case "Comment":
      return <FaComments className='text-blue-800'/>;
    case "Like":
      return <AiFillLike className='text-blue-800'/>;
    case "Create":
      return <LuLayoutTemplate className='text-blue-800'/>;
    case "Response":
      return <HiTemplate className='text-blue-800'/>;
  }
};

export default function ActivityTimeline({userId}) {
  const {activities,getRecentActivities} = useActivityStore();
  
  useEffect(()=>{
    getRecentActivities(userId);
  },[getRecentActivities,userId]);

  if(activities.length === 0) {
    return (
      <div className='h-full'>
        <p className='text-center italic text-gray-500'>No activities found</p>
      </div>)
  }


  return (
    <Timeline position="alternate">
      {activities.map((activity, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
            color="text.primary"
          >
            <span className='text-gray-700'>{formatDistanceToNow(activity.time)} ago</span>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>{getIcon(activity.type)}</TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }} >
            <Typography variant="h6" component="span">
              <span className='text-md'>{activity.type}</span>
            </Typography>
            <Typography><span className='text-sm text-gray-500 italic'>{activity.description}</span></Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
