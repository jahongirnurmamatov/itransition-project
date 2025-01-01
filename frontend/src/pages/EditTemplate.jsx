import { useTemplateStore } from '@/store/templateStore';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CreateTemplate from './CreateTemplate';

const EditTemplate = () => {
    const { templateId } = useParams();
    const {getTemplateById} = useTemplateStore();
    useEffect(() => {
        getTemplateById(templateId);
    }, [templateId]);

  return (
    <div className='w-full h-full flex justify-center items-center'>
        <CreateTemplate editingTemplate={true}/>
    </div>
  )
}

export default EditTemplate