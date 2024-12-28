import { useTemplateStore } from '@/store/templateStore';
import React from 'react'
import { BsChatLeftQuote } from 'react-icons/bs';

const AggregatedView = () => {
    const {title,topic,imageUrl,forms,tags,description,previewImg} = useTemplateStore();
  return (
    <div className="flex flex-col gap-3 mb-10">
        <div className="w-full  min-h-screen flex flex-col items-start">
            {previewImg || imageUrl && 
              <div className="flex items-center justify-center h-[300px] w-[100%] top-0">
                <img src={previewImg||imageUrl} alt="" className='h-[200px] w-[100%] overflow-hidden object-cover' />
              </div>
            }
            <div className="mx-auto w-4/5 my-6">
                <h1 className="text-2xl text-center font-bold text-primary">{title}</h1>
                <div className="flex justify-end my-2">
                        {topic.trim('').length > 0 && <div className="flex gap-2">
                          <BsChatLeftQuote className="size-5 text-gray-500 " />
                          <p className="text-sm text-secondary">{topic}</p>
                        </div>}
                </div>
                {description && <p className="text-sm font-light text-gray-500">{description}</p>}

                {/* here goes aggregated form of responses */}
            </div>
        </div>
    </div>
  )
}

export default AggregatedView