function useTime(date) {
  if (!date) return "";
  const currentDate = Date.now();
  const dateObj = new Date(date);
  const timeDifference = currentDate - Date.now(date);
  const yearBegin = new Date(`${dateObj.getFullYear()}`).getTime();

  //   If timeDifference is during the day
  if (timeDifference >= 0 && timeDifference <= 86400000) {
    return dateObj.toLocaleString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  //   If timeDifference is during the week
  if (timeDifference <= 604800000) {
    return dateObj.toLocaleString("en-US", {
      weekday: "short",
      day: "2-digit",
    });
  }
  // If timeDiffenrence is this year
  if (yearBegin <= date) {
    return dateObj.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
    });
  }

  //  If timeDifference is other year
  if (yearBegin > date) {
    return dateObj.toLocaleString("en-US", {
      dateStyle: "medium",
    });
  }
}

export default useTime;
