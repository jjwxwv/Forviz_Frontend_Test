import { Box, Stack, Typography } from "@mui/material";
import { Booking } from "../types/BookingData";
import UpcomingDate from "./UpcomingDate";
import UpComingSchedule from "./UpComingSchedule";

function UpcomingEvent({
  data,
  selectedRoom,
  currentDate,
}: {
  data: Booking[][];
  selectedRoom: string;
  currentDate: Date;
}) {
  const upComingEvent = data
    .map((cur) => {
      const event = cur.filter((item) => {
        const bookingEndTime = new Date(item.endTime);
        return bookingEndTime >= currentDate;
      });
      return event;
    })
    .filter((cur) => cur.length !== 0);

  const currentDateTime = currentDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  function checkScheduleLeft() {
    if (upComingEvent.length > 0) {
      const schedule = upComingEvent[0].filter((cur) => {
        const bookingEnd = new Date(cur.endTime);
        const endTime = bookingEnd.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        });
        return currentDateTime <= endTime;
      });
      return schedule.length > 0 ? schedule : upComingEvent[0];
    }
    return "No Schedule Left";
  }

  const schedule = checkScheduleLeft();
  // console.log(schedule);

  return (
    <Stack gap={10} flexGrow={5} paddingLeft={"6%"}>
      <Stack pl="10%" justifyContent="center" bgcolor="#2EBAEE" height="135px">
        <Typography variant="h3" color="White">
          {selectedRoom}
        </Typography>
      </Stack>
      <Box>
        {upComingEvent.length > 0 ? (
          <UpcomingDate
            upComingData={upComingEvent[0]}
            currentDate={currentDate}
          />
        ) : (
          <Typography variant="h2" color="White">
            No Upcoming Event
          </Typography>
        )}
      </Box>
      {typeof schedule === "object" ? (
        schedule.map((cur, i) => (
          <UpComingSchedule key={i} dailySchedule={cur} />
        ))
      ) : (
        <Typography variant="body1" color="White">
          {schedule}
        </Typography>
      )}
    </Stack>
  );
}

export default UpcomingEvent;
