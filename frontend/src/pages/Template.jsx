import { useTemplateStore } from '@/store/templateStore';
import  { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Template = () => {
  const { template, getTemplateById, isLoading, error } = useTemplateStore();
  const { templateId } = useParams();

  useEffect(() => {
    console.log(templateId)
    if (templateId) {
      getTemplateById(templateId);
    }
  }, [templateId, getTemplateById]);

  console.log(template)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
     
    </div>
  );
};

export default Template;
