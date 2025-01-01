import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { DialogDemo } from '@/components/createForm/AddQuestion';
import PreviewComponentModal from '@/components/createForm/PreviewComponentModal';
import { TitleSheet } from '@/components/createForm/TitleSheet';
import { useTemplateStore } from '@/store/templateStore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import FormComponent from '@/components/createForm/FormComponent';
const CreateTemplate = ({editingTemplate}) => {
  const {  image,setPreviewImg,previewImg,forms,setForms,createTemplate,getMyTemplates,title,error } = useTemplateStore();
  const [formType, setFormType] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewImg(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);
 
  const addForm = (formType) => {
    const newForm = {
      id: uuidv4(),
      type: formType,
      label: 'Untitled label',
      options: [],
      required: false,
      description: 'Write small description here...',
    };
    setForms([...forms, newForm]);
  };
  let dId = uuidv4();
  useEffect(() => {
    dId = uuidv4();
  }, [forms]);


  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedForms = Array.from(forms);
    const [movedForm] = reorderedForms.splice(result.source.index, 1);
    reorderedForms.splice(result.destination.index, 0, movedForm);

    setForms(reorderedForms);
  };

 
  const handleSubmit = ()=>{
    if(forms.length>0){
      if(!title){
        toast({
          variant: "destructive",
          title: "Please add a title",
        })
        return;
      }
      createTemplate();
      if(!error){
        getMyTemplates();
        toast({
          variant: "default",
          title: "Template created successfully.",
        })
        navigate('/my-templates');
      }
    }else{
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Please at least one form question",
      })
    }
  }

  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className="w-full  min-h-screen flex items-start justify-center">
      <div className="mx-auto w-4/5 my-6">
        <h1 className="text-2xl  font-bold text-center text-primary">
          {editingTemplate ? 'Edit Template' : 'Create Template'}        
        </h1>
        {previewImg && 
          <div className="flex items-center justify-center h-[300px] w-[100%] my-5">
            <img src={previewImg} alt="" className='h-[300px] w-[100%] overflow-hidden object-cover' />
          </div>
        }
        <div className="flex gap-2 justify-end">
          <PreviewComponentModal  />
          <TitleSheet  />
        </div>
        <Droppable droppableId={dId}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col gap-4 my-5"
              >
                {forms.map((form, index) => (
                  <Draggable key={form.id}  draggableId={form.id.toString()} index={index}>
                    {(provided) => (
                      <FormComponent form={form} forms={forms} setForms={setForms} index={index} provided={provided} />
                    )}
                    </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        <div className="flex items-center justify-center gap-3">
          <DialogDemo
            addForm={addForm}
            setFormType={setFormType}
            formType={formType}
            />
            <Button  className='bg-green-700 text-white hover:bg-green-600 px-5' onClick={handleSubmit}>
              {editingTemplate ? 'Update Template' : 'Create Template'}
            </Button>
        </div>
      </div>
    </div>
  </DragDropContext>
  );
};

export default CreateTemplate;
