import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { Card, CardContent } from "@/components/ui/card";
import { useTemplateStore } from "@/store/templateStore";

const Popular = () => {
  const { templates } = useTemplateStore();

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center gap-20 justify-center ">
      <h1 className="text-5xl font-bold text-gray-100">Popular Templates</h1>
      <div className="w-[90%] mx-auto flex items-center justify-center">
        <Carousel
          className="w-full mx-auto"
          centerMode={true}
          centerSlidePercentage={33.33} 
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          infiniteLoop
        >
          {templates.map((template) => (
            <Card
              key={template.id} 
              className="w-[90%] h-[350px] overflow-hidden bg-primary-foreground rounded-lg shadow-md mx-auto"
            >
              <CardContent>
                <img
                  src={template.imageUrl || "https://form-publisher.com/blog/content/images/size/w1200/2023/01/How-to-Make-your-own-Google-Form.png"}
                  alt={template.title}
                  className="w-full h-[200px] object-cover rounded-md mt-3"
                />
                <h1 className="text-2xl font-bold text-gray-100 mt-4">
                  {template.title}
                </h1>
                <p className="text-lg font-light text-gray-500 mt-2">
                  {template.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Popular;
