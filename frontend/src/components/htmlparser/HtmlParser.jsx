import parse from 'html-react-parser';

const HtmlContent = ({ content }) => {
  return <div className='text-gray-500'>{parse(content)}</div>;
};

export default HtmlContent;