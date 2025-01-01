import { LuDelete } from "react-icons/lu";
import { FaRegCopy } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CheckboxForm from '@/components/createForm/CheckboxForm';
import ImageUpload from '@/components/createForm/ImageUpload';
import RadioForm from '@/components/createForm/RadioFrom';
import SelectForm from '@/components/createForm/SelectForm';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const FormComponent = ({form,forms,setForms,provided}) => {
    const [editing, setEditing] = useState(false);
   
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
    
  return (
    <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="w-full relative bg-primary-foreground rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md"
        > 
            <div className="absolute top-2 right-2 flex gap-2 items-center justify-center">
              <FaRegCopy onClick={() => duplicateForm(form.id)}
              className='size-5 text-slate-900 hover:opacity-80'/>
              <LuDelete onClick={() => deleteForm(form.id)}
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
  )
}

export default FormComponent

