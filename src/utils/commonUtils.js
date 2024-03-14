export const calculateTimeDifferenceInMinutes = (targetTime) => {
    var currDate = new Date().getTime();
    var prevDate = new Date(targetTime).getTime();

    var timeDifference = currDate - prevDate;

    return timeDifference/(1000*60);

  };