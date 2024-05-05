

export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      month: 'long',  
      day: 'numeric', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    };
    
    const formattedDate = date.toLocaleDateString('en-US', options);
    // const time = date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
  
    return formattedDate;
  }
  

  