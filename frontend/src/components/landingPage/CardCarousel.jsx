import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useMediaQuery } from "react-responsive";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import HtmlContent from "../htmlparser/HtmlParser";

const CardCarousel = ({ templates }) => {

  const isPhone = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const centerSlidePercentage = isPhone
    ? 100 
    : isTablet
    ? 50
    : 33.33; 

  return (
    <Carousel
      className="w-full mx-auto"
      centerMode={true}
      centerSlidePercentage={centerSlidePercentage}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      infiniteLoop
    >
      {templates.map((template) => (
        <Link to={`/templates/${template.id}`} key={template.id}>
          <Card
            className="w-[90%] h-[350px] overflow-hidden bg-[#7e40c5] rounded-lg shadow-md mx-auto"
          >
            <CardContent className="flex flex-col items-center justify-center w-full">
              <img
                src={template.imageUrl || "/form-for-card.png"}
                alt={template.title}
                className="w-full h-[200px] object-cover rounded-md mt-3"
              />
              <h1 className="text-md font-semibold text-white mt-4">
                {template.title}
              </h1>
              <p className="text-md font-light text-gray-200 mt-2">
                <HtmlContent content={template.description}/>
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Carousel>
  );
};

export default CardCarousel;
