export const ConvertDateUsFormat = (dateString) => {
  if (dateString == null) {
    return ''; // or handle the null/undefined case as needed
  }
  
  const date = new Date(dateString);
  if (isNaN(date)) {
    return ''; // handle invalid date strings
  }
  
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate.replace(/,/g, ' ');
};
