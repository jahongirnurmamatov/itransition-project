import { useTemplateStore } from '@/store/templateStore'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { useResponseStore } from '@/store/responseStore';



const WhoResponded = () => {
    const {responders} = useResponseStore();
    
 return (
        <HoverCard >
            <HoverCardTrigger>
                <span className='text-gray-500 text-sm hover:underline cursor-pointer'>{responders.length} 
                    <span className='hidden md:inline'> Responses</span> 
                </span>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="text-sm"></div>
                <div className="flex flex-col gap-1 items-start justify-center">
                    {responders.map((responder,idx) => (
                        <p className="text-sm font-bold" key={idx}>{responder?.user?.username}</p>
                    ))}
                </div>
            </HoverCardContent>
        </HoverCard>
  )
}

export default WhoResponded