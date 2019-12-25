const tempus = {

    dayOfYear(value) {
        const date = new Date(value.getFullYear(), 0, 1);
        return Math.floor(this.differenceInDays(value, date));
    },

    weekOfYear(value) {
        const startOfYear = new Date(value.getFullYear(), 0, 1);
        startOfYear.setDate(startOfYear.getDate() + (1 - (startOfYear.getDay() % 7)));
        return Math.floor(this.differenceInWeeks(value, startOfYear)) + 1;
    },

    quarterOfYear(value) {
        return Math.floor(value.getMonth() / 3) + 1;
    },

    max(values) {
        return new Date(Math.max.apply(null, values));
    },

    min(values) {
        return new Date(Math.min.apply(null, values));
    },


    addMilliseconds(value, milliseconds) {
        const timestamp = value.getTime();
        return new Date(timestamp + milliseconds);
    },

    addSeconds(value, seconds) {
        const milliseconds = seconds * 1000;
        return this.addMilliseconds(value, milliseconds);
    },

    addMinutes(value, minutes) {
        const seconds = minutes * 60;
        return this.addSeconds(value, seconds);
    },

    addHours(value, hours) {
        const minutes = hours * 60;
        return this.addMinutes(value, minutes);
    },

    addDays(value, days) {
        const date = new Date(value.getTime());
        date.setDate(date.getDate() + days);
        return date;
    },

    addWeeks(value, weeks) {
        const days = weeks * 7;
        return this.addDays(value, days);
    },

    addMonths(value, months) {
        const date = new Date(value.getTime());
        date.setMonth(date.getMonth() + months);
        return date;
    },

    addQuarters(value, quarters) {
        const months = quarters * 3;
        return this.addMonths(value, months);
    },

    addYears(value, years) {
        const date = new Date(value.getTime());
        date.setFullYear(date.getFullYear() + years);
        return date;
    },


    subtractMilliseconds(value, milliseconds) {
        return this.addMilliseconds(value, -milliseconds);
    },

    subtractSeconds(value, seconds) {
        return this.addSeconds(value, -seconds);
    },

    subtractMinutes(value, minutes) {
        return this.addMinutes(value, -minutes);
    },

    subtractHours(value, hours) {
        return this.addHours(value, -hours);
    },

    subtractDays(value, days) {
        return this.addDays(value, -days);
    },

    subtractWeeks(value, weeks) {
        return this.addWeeks(value, -weeks);
    },

    subtractMonths(value, months) {
        const date = new Date(value.getTime());

        date.setMonth(date.getMonth() - months);
        while (date.getMonth() === value.getMonth()) {
            date.setDate(date.getDate() - 1);
        }
        return date;
    },

    subtractQuarters(value, quarters) {
        const months = quarters * 3;
        return this.subtractMonths(value, months);
    },

    subtractYears(value, years) {
        return this.addYears(value, -years);
    },


    differenceInMilliseconds(value, other) {
        return Math.abs(value.getTime() - other.getTime());
    },

    differenceInSeconds(value, other) {
        const milliseconds = this.differenceInMilliseconds(value, other);
        return milliseconds / 1000;
    },

    differenceInMinutes(value, other) {
        const seconds = this.differenceInSeconds(value, other);
        return seconds / 60;
    },

    differenceInHours(value, other) {
        const minutes = this.differenceInMinutes(value, other);
        return minutes / 60;
    },

    differenceInDays(value, other) {
        const hours = this.differenceInHours(value, other);
        return hours / 24;
    },

    differenceInWeeks(value, other) {
        const days = this.differenceInDays(value, other);
        return days / 7;
    },

    differenceInMonths(value, other) {
        const years = this.differenceInYears(value, other);
        const months = Math.abs(value.getMonth() - other.getMonth());
        return years * 12 + months;
    },

    differenceInQuarters(value, other) {
        const years = this.differenceInYears(value, other);
        const quarters = Math.abs(this.quarterOfYear(value) - this.quarterOfYear(other));
        return years * 4 + quarters;
    },

    differenceInYears(value, other) {
        return Math.abs(value.getFullYear() - other.getFullYear());
    },


    isDate(value) {
        return value instanceof Date;
    },

    isLeapYear(value) {
        const year = value.getFullYear();
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    },

    isEqual(value, other) {
        return value.getTime() === other.getTime();
    },

    isBefore(value, other) {
        return value < other;
    },

    isAfter(value, other) {
        return value > other;
    },

    isBetween(value, interval) {
        const { start, end } = interval;
        return value >= start && value <= end;
    },

};

export default Object.freeze(tempus);
