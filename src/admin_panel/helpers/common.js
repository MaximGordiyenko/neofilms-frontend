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

export const formatStatus = (status) => {
  return status?.replace(/_/g, ' ');
};

export const trimText = (text, maxLength) => {
  if (text?.length <= maxLength) {
    return text;
  }
  return text?.substring(0, maxLength) + '...';
}
