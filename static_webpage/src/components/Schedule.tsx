import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Typography } from "@mui/material";
import { Booking } from "../types/BookingData";

function Schedule({ data }: { data: Booking }) {
  const startTime = new Date(data.startTime).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const endTime = new Date(data.endTime).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  return (
    <>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="body2" color="#787878">
            {`${startTime} - ${endTime}`}
          </Typography>
          <Typography variant="body1">{data.title}</Typography>
        </TimelineContent>
      </TimelineItem>
    </>
  );
}

export default Schedule;
