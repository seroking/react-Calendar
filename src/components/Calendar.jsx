import { useState } from "react";
import CustomCalendar from "./CustomCalendar";
import moment from "moment";
import { useSelector } from "react-redux";
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const groups = useSelector((state) => state.groups);

  const handleWeekChange = (direction) => {
    setCurrentDate((prevDate) => prevDate.clone().add(direction, "week"));
  };

  return (
    <CustomCalendar
      groups={groups}
      currentDate={currentDate}
      onWeekChange={handleWeekChange}
    />
  );
};

export default Calendar;