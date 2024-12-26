import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CheckboxForm from '@/components/createForm/CheckboxForm';
import ImageUpload from '@/components/createForm/ImageUpload';
import RadioForm from '@/components/createForm/RadioFrom';
import SelectForm from '@/components/createForm/SelectForm';
import { DialogDemo } from '@/components/createForm/AddQuestion';
import PreviewComponentModal from '@/components/createForm/PreviewComponentModal';
import { TitleSheet } from '@/components/createForm/TitleSheet';
import { LuDelete } from "react-icons/lu";
import { FaRegCopy } from "react-icons/fa";
import { useTemplateStore } from '@/store/templateStore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
const CreateTemplate = () => {
  const {  image,setPreviewImg,previewImg,forms,setForms,createTemplate,getMyTemplates,error } = useTemplateStore();
  const [formType, setFormType] = useState('');
  const [editing, setEditing] = useState(false);
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

  const editLabel = (id, label) => {
    const allforms = [...forms];
    const index = forms.findIndex((form) => form.id === id);
    if (index !== -1) {
      allforms[index].label = label;
      setForms(allforms);
    }
  };

  const editDescription = (id, description) => {
    const allforms = [...forms];
    const index = forms.findIndex((form) => form.id === id);
    if (index !== -1) {
      allforms[index].description = description;
      setForms(allforms);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedForms = Array.from(forms);
    const [movedForm] = reorderedForms.splice(result.source.index, 1);
    reorderedForms.splice(result.destination.index, 0, movedForm);

    setForms(reorderedForms);
  };

  const duplicateForm = (id) => {
    const index = forms.findIndex((form) => form.id === id);
    if (index !== -1) {
      const formToDuplicate = forms[index];
      const duplicatedForm = { ...formToDuplicate, id: uuidv4() };
      const updatedForms = [
        ...forms.slice(0, index + 1), 
        duplicatedForm,               
        ...forms.slice(index + 1),    
      ];
      setForms(updatedForms);
    }
  };

  const deleteForm = (id) => {
    const filteredForms = forms.filter((form) => form.id !== id);
    setForms(filteredForms);
  };
  
  const handleSubmit = ()=>{
    if(forms.length>0){
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
          Create Your Template           
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
                  <Draggable key={form.id} draggableId={form.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-full relative bg-primary-foreground rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md"
                      > 
                      <div className="absolute top-2 right-2 flex gap-2 items-center justify-center">
                        <FaRegCopy 
                        onClick={() => duplicateForm(form.id)}
                        className='size-5 text-slate-900 hover:opacity-80'/>
                        <LuDelete
                        onClick={() => deleteForm(form.id)}
                        className='size-5 text-slate-900 hover:opacity-80'/>
                      </div>
                        {form.type !== 'header' && form.type !== 'paragraph' && (
                          <div>
                            {editing ? (
                              <Input
                                onBlur={() => setEditing(false)}
                                type="text"
                                value={form.label}
                                onChange={(e) =>
                                  editLabel(form.id, e.target.value)
                                }
                                className="w-2/3 p-2 mb-1"
                              />
                            ) : (
                              <p
                                onClick={() => setEditing(true)}
                                onBlur={() => setEditing(false)}
                                className="text-lg font-semibold font-sans"
                              >
                                {form.label}
                              </p>
                            )}
                            {editing ? (
                              <Textarea
                                onBlur={() => setEditing(false)}
                                type="text"
                                value={form.description}
                                onChange={(e) =>
                                  editDescription(form.id, e.target.value)
                                }
                                className="w-2/3 p-2"
                              />
                            ) : (
                              <p
                                onClick={() => setEditing(true)}
                                className="text-sm font-light text-gray-500"
                              >
                                {form.description}
                              </p>
                            )}
                          </div>
                        )}
                        {(() => {
                          switch (form.type) {
                            case 'header':
                              return editing ? (
                                <Input
                                  onBlur={() => setEditing(false)}
                                  type="text"
                                  value={form.label}
                                  onChange={(e) =>
                                    editLabel(form.id, e.target.value)
                                  }
                                  className="w-2/3 p-2"
                                />
                              ) : (
                                <h1
                                  onClick={() => setEditing(true)}
                                  className="font-bold text-center text-2xl"
                                >
                                  {form.label}
                                </h1>
                              );
                            case 'number':
                              return (
                                <Input
                                  type="number"
                                  placeholder="Type a number here"
                                  className="w-2/3 p-2"
                                />
                              );
                            case 'checkbox':
                              return (
                                <CheckboxForm
                                  id={form.id}
                                  editing={editing}
                                  setEditing={setEditing}
                                />
                              );
                            case 'radio':
                              return (
                                <RadioForm
                                  id={form.id}
                                  editing={editing}
                                  setEditing={setEditing}
                                />
                              );
                            case 'textarea':
                              return (
                                <Textarea
                                  placeholder="Type your text here"
                                  className="w-full p-2"
                                  rows="4"
                                />
                              );
                            case 'select':
                              return (
                                <SelectForm
                                  id={form.id}
                                  editing={editing}
                                  setEditing={setEditing}
                                />
                              );
                            case 'image':
                              return <ImageUpload />;
                            case 'paragraph':
                              return editing ? (
                                <Textarea
                                  value={form.label}
                                  onChange={(e) =>
                                    editLabel(form.id, e.target.value)
                                  }
                                  onBlur={() => setEditing(false)}
                                  placeholder="Type form description here"
                                  className="w-full p-2"
                                  rows="4"
                                />
                              ) : (
                                <p
                                  onClick={() => setEditing(true)}
                                  className="text-sm font-light text-gray-500"
                                >
                                  {form.label}
                                </p>
                              );
                            default:
                              return null;
                          }
                        })()}
                      </div>
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
              Create Template
            </Button>
        </div>
      </div>
    </div>
  </DragDropContext>
  );
};

export default CreateTemplate;
