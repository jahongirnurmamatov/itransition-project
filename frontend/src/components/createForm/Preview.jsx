import { Checkbox, FormControlLabel, Input, Radio, RadioGroup, TextField } from "@mui/material";
import ImageUpload from "./ImageUpload";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const PreviewComponent = ({ forms,prevImg }) => {
  return (
    <div className="w-full bg-slate-100 min-h-screen flex flex-col items-start justify-center">
        {prevImg && 
          <div className="flex items-center justify-center h-[300px] w-[100%] mb-5 top-0">
            <img src={prevImg} alt="" className='h-[200px] w-[100%] overflow-hidden object-cover' />
          </div>
        }
      <div className="mx-auto w-4/5 my-6">
        
       
        <div className="flex flex-col gap-4 my-5">
          {forms.map((form) => (
            <div
              key={form.id}
              className="w-full bg-white rounded-lg flex flex-col gap-3 px-5 py-3 shadow-md"
            >
                {
                    form.type !== 'header' && form.type !== 'paragraph' && (<>
                    {form.label && (
                     <p className="text-lg font-semibold font-sans">{form.label}</p>
                     )}
                    {form.description && (
                     <p className="text-sm font-light text-gray-500">
                       {form.description}
                      </p>
                    )} 
                    </>)
                }
              
              {(() => {
                switch (form.type) {
                  case 'header':
                    return (
                      <h1 className="font-bold text-center text-2xl">
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
                        form.options.map((option,index)=>(
                            <div key={index} className="">
                                 <Checkbox id="terms" />
                                     <label
                                       htmlFor="terms"
                                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                     >
                                      {option}
                                    </label>
                            </div>
                        ))
                    )
                  case 'radio-group':
                    return (
                        <RadioGroup>
                            {form.options.map((option,index)=>
                                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                            )}
                        </RadioGroup>
                    )
                  case 'textarea':
                    return (
                      <TextField
                        id="standard-multiline-static"
                        label='Write your text here...'
                        multiline
                        rows={4}
                        variant="standard"
                        />
                    );
                  case 'select':
                    return (
                        <Select >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                               <SelectGroup  >
                                {
                                  form.options.map((option,index) => (
                                    <SelectItem key={index} value={option} >
                                      {option}
                                    </SelectItem>
                                  ))
                                }
                                </SelectGroup>
                                </SelectContent>
                            </Select>
                    )
                  case 'image':
                    return (<ImageUpload />);
                  case 'paragraph':
                    return (
                      <p className="text-sm font-light text-gray-500">
                        {form.label}
                      </p>
                    );
                  default:
                    return null;
                }
              })()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewComponent;
