export const calculateTimeDifferenceInMinutes = (targetTime) => {
    var currDate = new Date().getTime();
    var prevDate = new Date(targetTime).getTime();

    var timeDifference = currDate - prevDate;

    return timeDifference/(1000*60);

  };

  export const calculateTimeDifference = (targetTime) => {
    var currDate = new Date().getTime();
    var prevDate = new Date(targetTime).getTime();

    var timeDifference = currDate - prevDate;

    // Convert the time difference to a human-readable format
    var seconds = Math.floor((timeDifference / 1000) % 60);
    var minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    var hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    var result = "";

    if (days > 0) {
      result += days + " day ";
    }
    if (hours > 0) {
      result += hours + " hour ";
    }
    if (minutes > 0) {
      result += minutes + " min ";
    }
    if (seconds > 0) {
      result += seconds + "  sec";
    }
    if (result === "") {
      result = "Just Now";
    }

    return result;

  };