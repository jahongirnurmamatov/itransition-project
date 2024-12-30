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
    default:
      return <TimelineDot className='text-blue-800'/>;
  }
};

export default function ActivityTimeline({userId}) {
  const {activities,getRecentActivities} = useActivityStore();
  
  console.log(activities)
  useEffect(()=>{
    getRecentActivities(userId);
  },[getRecentActivities,userId]);

  if(activities.length === 0) {
    return (
      <div className='h-full'>
        <p className='text-center italic text-gray-500'>No activities yet</p>
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
            <p className='text-gray-700'>{formatDistanceToNow(activity.time)} ago</p>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>{getIcon(activity.type)}</TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }} >
            <Typography variant="h6" component="span">
              <p className='text-md'>{activity.type}</p>
            </Typography>
            <Typography><p className='text-sm text-gray-500 italic'>{activity.description}</p></Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
