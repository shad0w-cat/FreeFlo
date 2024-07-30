import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween); // use plugin

interface PeriodDetails {
  start: Date;
  end: Date;
  cycle_time: number;
  next_cycle: number;
}

const CalendarComponent = () => {
  const currentDate = dayjs();
  const periodDetails: PeriodDetails = {
    start: dayjs('5 July 2024').toDate(),
    end: dayjs('5 July 2024').add(5, 'day').toDate(),
    cycle_time: 5,
    next_cycle: 28,
  };

  // Subtract one month from the current date
  const previousMonthDate = currentDate.subtract(0, 'month').toDate();
  const [today, setToday] = useState<any>(previousMonthDate);

  const isPeriodDay = (date: {
    year: number;
    month: number;
    day: number | undefined;
  }) => {
    const start = dayjs(periodDetails.start);
    const end = dayjs(periodDetails.end);
    const currentDate = new Date(date.year, date.month, date.day);
    console.log(start, end, currentDate);
    return dayjs(currentDate).isBetween(start, end, null, '[]');
  };

  const isCurrentMonth = (date: { month: number }) => {
    return date.month === dayjs().month();
  };

  const dayTemplate = (date: any) => {
    const currentDate = new Date(date.year, date.month, date.day);
    const isPeriod = isPeriodDay(date);
    const isActiveMonth = isCurrentMonth(date);
    // console.log(currentDate, isPeriod, isActiveMonth);

    const dayClass = `${
      isPeriod && isActiveMonth
        ? 'bg-red-300 rounded-full p-10 text-black font-medium'
        : ''
    } ${!isActiveMonth && isPeriod ? 'border border-gray-300' : ''}`;
    // console.log(currentDate);
    return <div className={dayClass}>{currentDate.getDate()}</div>;
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Calendar
        value={today}
        // onChange={(e) => setToday(e.value)}
        numberOfMonths={3}
        inline
        className="w-4/5"
        dateTemplate={dayTemplate}
      />
    </div>
  );
};

export default CalendarComponent;
