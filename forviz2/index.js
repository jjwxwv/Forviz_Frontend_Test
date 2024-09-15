"use strict";

const bookingData = [
  {
    id: 1,
    roomId: "A101",
    startTime: "2019-09-28 13:00:00",
    endTime: "2019-09-28 14:00:00",
    title: "Lunch with Petr",
  },
  {
    id: 2,
    roomId: "A101",
    startTime: "2019-09-28 14:00:00",
    endTime: "2019-09-28 15:00:00",
    title: "Sales Weekly Meeting",
  },
  {
    id: 3,
    roomId: "A101",
    startTime: "2019-09-28 16:00:00",
    endTime: "2019-09-28 18:00:00",
    title: "Anastasia Website Warroom",
  },
  {
    id: 4,
    roomId: "A101",
    startTime: "2019-09-29 13:00:00",
    endTime: "2019-09-29 14:00:00",
    title: "One-on-One Session",
  },
  {
    id: 5,
    roomId: "A101",
    startTime: "2019-09-29 16:00:00",
    endTime: "2019-09-29 18:00:00",
    title: "UGC Sprint Planning",
  },
  {
    id: 6,
    roomId: "A102",
    startTime: "2019-09-30 09:00:00",
    endTime: "2019-10-04 18:00:00",
    title: "5-Day Design Sprint Workshop",
  },
  {
    id: 7,
    roomId: "Auditorium",
    startTime: "2019-09-19 09:00:00",
    endTime: "2019-09-23 19:00:00",
    title: "Thai Tech Innovation 2019",
  },
  {
    id: 8,
    roomId: "A101",
    startTime: "2019-09-28 10:00:00",
    endTime: "2019-09-28 13:00:00",
    title: "Raimonland project",
  },
  {
    id: 9,
    roomId: "A102",
    startTime: "2019-09-30 18:00:00",
    endTime: "2019-09-30 20:00:00",
    title: "Management Meetinng",
  },
  {
    id: 10,
    roomId: "A101",
    startTime: "2019-10-04 14:00:00",
    endTime: "2019-10-06 11:00:00",
    title: "3-day workshop Corgi costume",
  },
];

const currentDate = new Date("2019-09-25");

const checkAvailability = (roomId, startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (start >= end) {
    console.log("invalid startTime and endTime");
    return false;
  }
  const getRoom = bookingData.filter((room) => room.roomId === roomId);
  const availablity = getRoom.every((room) => {
    const roomStart = new Date(room.startTime);
    const roomEnd = new Date(room.endTime);
    return !(start < roomEnd && roomStart < end);
  });
  console.log(availablity);
  return availablity;
};

const getBookingsForWeek = (roomId, weekNo) => {
  const startWeekDay = getStartOfWeek(currentDate, weekNo);
  const endWeekDay = new Date(startWeekDay);
  endWeekDay.setDate(startWeekDay.getDate() + 7);
  const roomSchedule = bookingData
    .filter((room) => {
      const bookingStart = new Date(room.startTime);
      const bookingEnd = new Date(room.endTime);
      return (
        room.roomId === roomId &&
        ((bookingStart >= startWeekDay && bookingStart < endWeekDay) ||
          (bookingEnd >= startWeekDay && bookingEnd <= endWeekDay))
      );
    })
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  console.log(roomSchedule);
  return roomSchedule;
};

function getStartOfWeek(currentDate, weekNo) {
  const day = currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - day);
  startOfWeek.setDate(startOfWeek.getDate() + weekNo * 7);

  return startOfWeek;
}

checkAvailability("A102", "2019-10-01 19:00:00", "2019-10-05 20:00:00");
getBookingsForWeek("A101", 0);
