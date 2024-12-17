import React, { useState } from 'react';
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

const CreateTemplate = () => {
  const [formType, setFormType] = useState('');
  const [forms, setForms] = useState([]);
  const [editing, setEditing] = useState(false);

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
     console.log(result);
    if (!result.destination) return;

    const reorderedForms = Array.from(forms);
    const [movedForm] = reorderedForms.splice(result.source.index, 1);
    reorderedForms.splice(result.destination.index, 0, movedForm);

    setForms(reorderedForms);
  };
  console.log(forms)
  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className="w-full bg-slate-100 min-h-screen flex items-start justify-center">
      <div className="mx-auto w-4/5 my-6">
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-center text-slate-800">
          Create Your Form           
        </h1>
        <PreviewComponentModal forms={forms} />
        </div>
        <Droppable droppableId="forms" className='h-full'>
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
                        className="w-full bg-white rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md"
                      >
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
                                  forms={forms}
                                  setForms={setForms}
                                  editing={editing}
                                  setEditing={setEditing}
                                />
                              );
                            case 'radio-group':
                              return (
                                <RadioForm
                                  id={form.id}
                                  forms={forms}
                                  setForms={setForms}
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
                                  forms={forms}
                                  setForms={setForms}
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
        <div className="flex items-center justify-center">
          <DialogDemo
            addForm={addForm}
            setFormType={setFormType}
            formType={formType}
            />
        </div>
      </div>
    </div>
  </DragDropContext>
  );
};

export default CreateTemplate;
