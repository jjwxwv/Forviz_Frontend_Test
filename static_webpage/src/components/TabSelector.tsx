import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import DayEvent from "./DayEvent";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Booking } from "../types/BookingData";
import { getBookingsForWeek } from "../function/getBooking";

const weekQuery: { [key: string]: string } = {
  thisweek: "0",
  nextweek: "1",
  wholemonth: "2",
};

function TabSelector({
  data,
  selectedRoom,
  currentDate,
}: {
  data: Booking[][];
  selectedRoom: string;
  currentDate: Date;
}) {
  const { param } = useParams();
  const [weekNo, setWeekNo] = useState<string>("0");
  const dayEvent = getBookingsForWeek(currentDate, Number(weekNo), data);

  function handleChange(
    _: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) {
    setWeekNo(newValue);
  }

  useEffect(
    function () {
      async function setQueryString() {
        if (param) {
          setWeekNo(weekQuery[param]);
        }
      }
      setQueryString();
    },
    [param]
  );

  return (
    <Box bgcolor="white" flexGrow={6}>
      <TabContext value={weekNo}>
        <TabList
          onChange={handleChange}
          sx={{
            backgroundColor: "#EFEEEC",
            height: "135px",
            pl: "40px",
            alignItems: "end",
          }}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#46529D",
            },
          }}
        >
          {["This Week", "Next Week", "Whole Month"].map((cur, i) => {
            const str = cur.split(" ").join("").toLowerCase();
            return (
              <Tab
                key={i}
                label={cur}
                component={Link}
                value={i.toString()}
                to={`/bookings/${str}?roomId=${selectedRoom}`}
              />
            );
          })}
        </TabList>
        {dayEvent.map((eventData, i) => {
          return (
            <TabPanel key={i} value={weekNo} sx={{ px: 0 }}>
              {<DayEvent data={eventData} />}
            </TabPanel>
          );
        })}
      </TabContext>
    </Box>
  );
}

export default TabSelector;
