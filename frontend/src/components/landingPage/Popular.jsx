import { useTemplateStore } from "@/store/templateStore";
import CardCarousel from "./CardCarousel";

const Popular = () => {
  const { templates } = useTemplateStore();

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center gap-20 justify-center ">
      <h1 className="text-5xl font-bold text-gray-100">Popular Templates</h1>
      <div className="w-[80%] mx-auto flex items-center justify-center">
        <CardCarousel templates={templates}/>
      </div>
    </div>
  );
};

export default Popular;
