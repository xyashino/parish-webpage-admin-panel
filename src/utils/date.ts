export const findAllDaysStartOnNextMonday = (): Array<Date> => {
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

export const formatDate = (date: Date): string => {
  const year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};
export const addDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
};
