export class DateUtils {

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    return this.addDaysInDate(result, days);
  }

  static addDaysInDate(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
}
