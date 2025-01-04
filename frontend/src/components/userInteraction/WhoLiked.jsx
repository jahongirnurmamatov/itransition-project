import { useTemplateStore } from '@/store/templateStore'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';



const WhoLiked = ({d}) => {
    const {likes} = useTemplateStore();
 return (
        <HoverCard >
            <HoverCardTrigger>
                <span className='text-gray-500 text-sm hover:underline cursor-pointer'>{likes.length} 
                    <span className='hidden md:inline'> {d.likes}</span> 
                </span>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="text-sm"></div>
                <div className="flex flex-col gap-1 items-start justify-center">
                    {likes.map((like,idx) => (
                        <p className="text-sm font-bold" key={idx}>{like?.user?.username}</p>
                    ))}
                </div>
            </HoverCardContent>
        </HoverCard>
  )
}

export default WhoLiked