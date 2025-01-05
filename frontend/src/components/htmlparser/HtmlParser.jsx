import parse from 'html-react-parser';

const HtmlContent = ({ content }) => {
  return <div>{parse(content)}</div>;
};

export default HtmlContent;