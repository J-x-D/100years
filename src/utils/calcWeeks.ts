// calculates the number of weeks between the given date and today
export default function calcWeeks(date: Date) {
    const today = new Date();
    const diff = today.getTime() - date.getTime();
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    console.log(weeks);
    return weeks;
}