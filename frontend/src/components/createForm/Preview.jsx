import ImageUpload from "./ImageUpload";

const PreviewComponent = ({ forms }) => {
  return (
    <div className="w-full bg-slate-100 min-h-screen flex items-start justify-center">
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
                      <input
                        type="number"
                        placeholder="Type a number here"
                        className="w-2/3 p-2 border border-gray-300 rounded"
                        readOnly
                      />
                    );
                  case 'checkbox':
                    return (
                      <div className="flex flex-col">
                        {form.options.map((option, index) => (
                          <label key={index} className="flex items-center gap-2">
                            <input type="checkbox" disabled />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    );
                  case 'radio-group':
                    return (
                      <div className="flex flex-col">
                        {form.options.map((option, index) => (
                          <label key={index} className="flex items-center gap-2">
                            <input type="radio" disabled />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    );
                  case 'textarea':
                    return (
                      <textarea
                        placeholder="Type your text here"
                        className="w-1/2 p-2 border border-gray-300 rounded"
                        rows="4"
                        readOnly
                      ></textarea>
                    );
                  case 'select':
                    return (
                      <select
                        className="w-2/3 p-2 border border-gray-300 rounded"
                        disabled
                      >
                        {form.options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    );
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
