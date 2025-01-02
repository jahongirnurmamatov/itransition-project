import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const CardCarousel = ({templates}) => {
  return (
    
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
            <Link to={`/templates/${template.id}`} key={template.id}>

            <Card
              key={template.id} 
              className="w-[90%] h-[350px] overflow-hidden bg-[#7e40c5] rounded-lg shadow-md mx-auto"
            >
              <CardContent className="flex flex-col items-center justify-center w-full">
                <img
                  src={template.imageUrl || "/form-for-card.png"}
                  alt={template.title}
                  className="w-full h-[200px] object-cover rounded-md mt-3"
                  />
                <h1 className="text-2xl font-bold text-white mt-4">
                  {template.title}
                </h1>
                <p className="text-lg font-light text-gray-200 mt-2">
                  {template.description}
                </p>
              </CardContent>
            </Card>
          </Link>
          ))}
        </Carousel>
  )
}

export default CardCarousel