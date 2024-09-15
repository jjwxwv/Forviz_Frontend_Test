import { Timeline, timelineItemClasses } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import Schedule from "./Schedule";
import { Booking } from "../types/BookingData";
import { months, weekday } from "../utils/dateData";

function DayEvent({ data }: { data: Booking[] }) {
  const bookingStart = new Date(data[0].startTime);
  const day = new Date(bookingStart).getDay();
  const date = new Date(bookingStart).getDate();
  const month = new Date(bookingStart).getMonth();
  return (
    <>
      <Stack justifyContent="center" pl="40px" bgcolor="#F7F7F7" height="47px">
        <Typography variant="body1" color="#787878">
          {`${weekday[day]}, ${date} ${months[month]}`}
        </Typography>
      </Stack>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            p: 0,
          },
          pl: "40px",
        }}
      >
        {data.map((cur) => {
          return <Schedule key={cur.id} data={cur} />;
        })}
      </Timeline>
    </>
  );
}

export default DayEvent;
