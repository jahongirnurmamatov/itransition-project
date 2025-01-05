import { useAuthStore } from '@/store/authStore';
import { useCommentStore } from '@/store/commentStore';
import { useTemplateStore } from '@/store/templateStore';
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import WhoLiked from './WhoLiked';
import { useResponseStore } from '@/store/responseStore';
import WhoResponded from './WhoResponded';
import { useLanguageStore } from '@/store/languageStore';
import { toast } from '@/hooks/use-toast';
export const Interaction = ({templateId,setShowComments}) => {
    const {comments} = useCommentStore();
    const {authUser:user,isAuthenticated} = useAuthStore();
    const {likes,likeUnlike} = useTemplateStore();
    const {responders} = useResponseStore();
   const {dictionary:d} =useLanguageStore();
    const islikedTemplate = likes.some((like) => like?.userId === user?.id);

    const handleLikeUnlike =  () => {
      if(!isAuthenticated) {
        toast({
          variant: "destructive",
          title: d.error,
          description: d.pleaseLoginMessage,
        })
        return 
      }else{
        likeUnlike(templateId);
      }
    }
  return (
    <div className='flex justify-between items-center my-1'>
        <div className="flex items-center justify-center gap-1">
        {
            !islikedTemplate ? <AiOutlineLike onClick={handleLikeUnlike} className='size-5 cursor-pointer hover:opacity-80 text-blue-800' />
             : <AiFillLike onClick={handleLikeUnlike} className='size-5 text-blue-800 cursor-pointer hover:opacity-80' />
        } 
          <WhoLiked d={d}/>
        </div>
        <div className="flex items-center justify-center gap-3">
            <div 
            onClick={()=>setShowComments((prev)=>!prev)}
            className="flex items-center justify-center gap-2">
                {comments?.length>0 && <span className='text-gray-500  cursor-pointer hover:opacity-80 hover:underline text-sm'>{comments.length}
                   <span className='hidden md:inline'> {d.comments}</span></span>}
                <FaCommentDots className='size-5 text-gray-500 cursor-pointer hover:opacity-80 ' />
            </div> 
            <div className="flex items-center justify-center gap-2">
                {responders?.length>0 && <WhoResponded d={d}/>}
                <IoStatsChart className='size-5 text-gray-500 cursor-pointer hover:opacity-80 ' />
            </div>
        </div>
    </div>
  )
}

