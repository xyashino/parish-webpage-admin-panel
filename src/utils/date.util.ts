export class DateUtil {
  static getLocalMonthName = (date: Date): string =>
    new Intl.DateTimeFormat("pl", {
      month: "long",
      locale: "pl",
    } as Intl.DateTimeFormatOptions)
      .format(date)
      .replace(/^\w/, (c) => c.toUpperCase());

  static createDateRange = (
    start: string | Date,
    end: string | Date
  ): string => {
    if (!start || !end) return "";

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate.getMonth() === endDate.getDate()) {
      const localeMonth = this.getLocalMonthName(startDate);
      return `${localeMonth} ${startDate.getDay()}-${endDate.getDate()}`;
    }

    return `${startDate.getDay()} ${DateUtil.getLocalMonthName(
      startDate
    )} - ${endDate.getDate()} ${DateUtil.getLocalMonthName(endDate)}`;
  };

  static getDayAndMonth = (date: string | Date): string => {
    const tempDate = new Date(date);
    const month = tempDate.getMonth() + 1;
    const day = tempDate.getDate();
    return ` ${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}`;
  };

  static formatDate = (date: Date): string => {
    const year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();

    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
  };
  static findAllDaysStartOnNextMonday = (): Array<Date> => {
    const today = new Date();
    let day = today.getUTCDay();
    let daysUntilMonday = 8 - day;
    if (day === 1) {
      daysUntilMonday = 7;
    }
    let days = [];
    for (let i = 0; i < 7; i++) {
      let newDate = new Date(
        today.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000
      );
      newDate.setDate(newDate.getDate() + i);
      days.push(newDate);
    }
    return days;
  };
}
