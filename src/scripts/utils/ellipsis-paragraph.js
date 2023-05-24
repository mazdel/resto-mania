const ellipsisParagraph = (paragraph, wordCount = 40) => {
  const words = paragraph.split(' ');
  if (words.length > wordCount) {
    return `${words.slice(0, wordCount).join(' ')}...`;
  }
  return paragraph;
};
export default ellipsisParagraph;
