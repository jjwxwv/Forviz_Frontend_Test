import { Stack } from "@mui/material";
import UpcomingEvent from "./components/UpcomingEvent";
import TabSelector from "./components/TabSelector";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGroupedScheduleByRoom } from "./function/getBooking";
import bookingData from "./assets/demo_booking_data.json";

function AppLayout() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [selectedRoom, setSelectedRoom] = useState<string>("a101");
  const data = getGroupedScheduleByRoom(bookingData, selectedRoom);

  //manually set current date because data is in year 2019
  const currentDate = new Date("2019-09-28 09:30:00");
  console.log(data);

  useEffect(
    function () {
      async function setQueryString() {
        if (roomId) {
          setSelectedRoom(roomId);
        }
      }
      setQueryString();
    },
    [roomId]
  );

  return (
    <Stack direction="row" bgcolor="#46529D" height="100vh">
      <UpcomingEvent
        data={data}
        selectedRoom={selectedRoom}
        currentDate={currentDate}
      />
      <TabSelector
        data={data}
        selectedRoom={selectedRoom}
        currentDate={currentDate}
      />
    </Stack>
  );
}

export default AppLayout;
