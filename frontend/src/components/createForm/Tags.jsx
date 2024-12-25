import { IoMdPricetag } from "react-icons/io";

const tagColors = ["bg-red-200", "bg-green-200", "bg-blue-200", "bg-yellow-200", "bg-purple-200"];

function Tags({tags}) {
  return (
    <div>
            <div className="flex items-start justify-start gap-2">
              <IoMdPricetag className="size-5 text-gray-500" />
              {tags.map((tag, index) => (
                <p
                  key={index}
                  className={`text-sm text-gray-700 px-2 py-1 rounded ${tagColors[index % tagColors.length]}`}
                >
                  {tag}
                </p>
              ))}
            </div>
         
    </div>
  )
}

export default Tags