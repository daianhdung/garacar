export const formatNumber = function (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const compareIfGreaterThanLocalDateTime1Day = localDateTime =>{
    const now = new Date();
    //Create a localDateTime looklike in Java
    const localDateTime1DayAgo = {
        year: now.getFullYear(),
        month: now.getMonth() + 1, // Month start from 0 so need + 1
        day: now.getDate() -1,
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds(),
    };

    return compareLocalDateTime(localDateTime, localDateTime1DayAgo)
}

const compareLocalDateTime = (time1, time2) => {
    if (time1.year != time2.year) {
        return time1.year - time2.year;
    }
    if (time1.month !== time2.month) {
        return time1.month - time2.month;
    }

    if (time1.day !== time2.day) {
        return time1.day - time2.day;
    }

    if (time1.hour !== time2.hour) {
        return time1.hour - time2.hour;
    }

    if (time1.minute !== time2.minute) {
        return time1.minute - time2.minute;
    }

    if (time1.second !== time2.second) {
        return time1.second - time2.second;
    }
    return 0;
};
