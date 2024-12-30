import * as React from 'react';
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
import { activities } from '@/assets/data';


const getIcon = (type) => {
  switch (type) {
    case "comment":
      return <FaComments className='text-blue-800'/>;
    case "like":
      return <AiFillLike className='text-blue-800'/>;
    case "template":
      return <LuLayoutTemplate className='text-blue-800'/>;
    default:
      return <TimelineDot className='text-blue-800'/>;
  }
};

export default function ActivityTimeline() {
  return (
    <Timeline position="alternate">
      {activities.map((activity, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
            color="text.primary"
          >
            {activity.time}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>{getIcon(activity.type)}</TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }} >
            <Typography variant="h6" component="span">
              <p className='text-md'>{activity.title}</p>
            </Typography>
            <Typography><p className='text-sm'>{activity.description}</p></Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
