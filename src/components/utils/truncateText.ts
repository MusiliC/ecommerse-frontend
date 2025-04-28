export const truncateText = (text:string, charLimit = 90) => {
  if (text.length > charLimit) {
    return text.slice(0, charLimit) + "...";
  }
  return text;
};
