import { useTemplateStore } from '@/store/templateStore'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { useResponseStore } from '@/store/responseStore';



const WhoResponded = () => {
    const {responses} = useResponseStore();
    
 return (
        <HoverCard >
            <HoverCardTrigger>
                <span className='text-gray-500 text-sm hover:underline cursor-pointer'>{responses.length} 
                    <span className='hidden md:inline'> Responses</span> 
                </span>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="text-sm"></div>
                <div className="flex flex-col gap-1 items-start justify-center">
                    {responses.map((response,idx) => (
                        <p className="text-sm font-bold" key={idx}>{response?.user?.username}</p>
                    ))}
                </div>
            </HoverCardContent>
        </HoverCard>
  )
}

export default WhoResponded