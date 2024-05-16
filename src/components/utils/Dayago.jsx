
function Dayago(timestamp) {
    const now = new Date();
    const pastDate = new Date(timestamp);
    const timeDifference = now - pastDate;

    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} ${years > 1 ? 'years' : 'year'} ago`;
    }
    else if (months > 0) {
      return `${months} ${months > 1 ? 'months' : 'month'} ago`;
    }
    else if (days > 0) {
      return `${days} ${days > 1 ? 'days ago' : "day ago"}`;
    } 
    else if (hours > 0) {
      return `${hours} ${hours > 1 ? 'hours ago' : "hour ago"}`;
    } 
    else if (minutes > 0) {
      return `${minutes} ${minutes > 1 ? 'minutes ago' : "minute ago"}`;
    } 
    else {
      return `${seconds} ${seconds > 1 ? 'seconds ago' : "second ago"}`;
    }

}

export default Dayago