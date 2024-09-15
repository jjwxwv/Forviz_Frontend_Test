import { Typography } from "@mui/material";
import { months, weekday } from "../utils/dateData";
import { Booking } from "../types/BookingData";

function UpcomingDate({
  upComingData,
  currentDate,
}: {
  upComingData: Booking[];
  currentDate: Date;
}) {
  const bookingStart = new Date(upComingData[0].startTime);
  const currentDateTime = currentDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const filteredUpcomData = upComingData.filter((cur) => {
    const bookingEnd = new Date(cur.endTime);
    const endTime = bookingEnd.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    return currentDateTime <= endTime;
  });
  function checkDisplayedDate() {
    let disPlayed: Date;
    if (bookingStart >= currentDate) {
      disPlayed = bookingStart;
    } else {
      if (filteredUpcomData.length > 0) {
        disPlayed = currentDate;
      } else {
        disPlayed = new Date(currentDate);
        disPlayed.setDate(currentDate.getDate() + 1);
      }
    }
    return disPlayed;
  }
  const disPlayedDate = checkDisplayedDate();
  return (
    <>
      <Typography variant="subtitle1" color="White">
        Upcoming
      </Typography>
      <Typography variant="h2" color="White">
        {weekday[disPlayedDate.getDay()]}
      </Typography>
      <Typography variant="h2" color="White">
        {`${disPlayedDate.getDate()} ${months[disPlayedDate.getMonth()]}`}
      </Typography>
    </>
  );
}

export default UpcomingDate;
