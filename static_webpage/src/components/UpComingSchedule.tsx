import { Box, Typography } from "@mui/material";
import { Booking } from "../types/BookingData";

function UpComingSchedule({ dailySchedule }: { dailySchedule: Booking }) {
  const startTime = new Date(dailySchedule.startTime).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const endTime = new Date(dailySchedule.endTime).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  return (
    <Box key={dailySchedule.id}>
      <Typography
        variant="body2"
        color="White"
      >{`${startTime} - ${endTime}`}</Typography>
      <Typography variant="body1" color="White">
        {dailySchedule.title}
      </Typography>
    </Box>
  );
}

export default UpComingSchedule;
