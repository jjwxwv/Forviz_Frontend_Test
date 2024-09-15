import { Booking } from "../types/BookingData";

export const getBookingsForWeek = (
  currentDate: Date,
  weekNo: number,
  bookingData: Booking[][]
): Booking[][] => {
  const startWeekDay = getStartOfWeek(currentDate, weekNo);
  const endWeekDay = new Date(startWeekDay);
  endWeekDay.setDate(startWeekDay.getDate() + 7);
  let roomSchedule: Booking[][] = [];
  if (weekNo < 2) {
    roomSchedule = bookingData.map((cur) => {
      const daySchedule = cur.filter((day) => {
        const bookingStart = new Date(
          `${new Date(day.startTime).getFullYear()}-${new Date(
            day.startTime
          ).getMonth()}-${new Date(day.startTime).getDate()}`
        );
        const bookingEnd = new Date(
          `${new Date(day.endTime).getFullYear()}-${new Date(
            day.endTime
          ).getMonth()}-${new Date(day.endTime).getDate()}`
        );
        return (
          (bookingStart >= startWeekDay && bookingStart < endWeekDay) ||
          (bookingEnd >= startWeekDay && bookingEnd <= endWeekDay)
        );
      });
      return daySchedule;
    });
  } else {
    roomSchedule = bookingData.map((cur) => {
      const daySchedule = cur.filter((day) => {
        const bookingStartMonth = new Date(day.startTime).getMonth();
        const bookingEndMonth = new Date(day.endTime).getMonth();
        return (
          bookingStartMonth === currentDate.getMonth() ||
          bookingEndMonth === currentDate.getMonth()
        );
      });
      return daySchedule;
    });
  }
  return roomSchedule.filter((cur) => cur.length !== 0);
};

export function getGroupedScheduleByRoom(data: Booking[], roomId: string) {
  const events = data
    .filter((event) => event.roomId.toLowerCase() === roomId.toLowerCase())
    .sort(
      (a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime))
    );
  const groupedByDate = events.reduce(
    (acc: { [key: string]: Booking[] }, event) => {
      const eventDate = new Date(event.startTime).toISOString().split("T")[0];
      if (!acc[eventDate]) {
        acc[eventDate] = [];
      }
      acc[eventDate].push(event);
      return acc;
    },
    {}
  );
  return Object.values(groupedByDate);
}

function getStartOfWeek(currentDate: Date, weekNo: number) {
  const day = currentDate.getDay();
  const startOfWeek = new Date(
    `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`
  );
  startOfWeek.setDate(currentDate.getDate() - day);
  startOfWeek.setDate(startOfWeek.getDate() + weekNo * 7);
  return startOfWeek;
}
