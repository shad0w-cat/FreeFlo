import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

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
    end: dayjs('5 July 2024').add(4, 'day').toDate(),
    cycle_time: 4,
    next_cycle: 28,
  };

  const [today, setToday] = useState<any>(currentDate.toDate());

  const calculateCyclePeriods = (date: dayjs.Dayjs) => {
    const cycles = [];
    let start = dayjs(periodDetails.start);
    let end = start.add(periodDetails.cycle_time, 'day');

    while (start.isBefore(date.endOf('month').add(4, 'month'))) {
      cycles.push({ start: start.toDate(), end: end.toDate() });
      start = start.add(periodDetails.next_cycle, 'day');
      end = end.add(periodDetails.next_cycle, 'day');
    }
    while (start.isAfter(date.endOf('month').subtract(4, 'month'))) {
      start = start.subtract(periodDetails.next_cycle, 'day');
      end = start.add(periodDetails.cycle_time, 'day');
      cycles.push({ start: start.toDate(), end: end.toDate() });
    }

    return cycles;
  };

  const cycles = calculateCyclePeriods(currentDate);

  const isPeriodDay = (date: {
    year: number;
    month: number;
    day: number | undefined;
  }) => {
    const currentDate = new Date(date.year, date.month, date.day);
    return cycles.some((cycle) =>
      dayjs(currentDate).isBetween(
        dayjs(cycle.start),
        dayjs(cycle.end),
        null,
        '[]'
      )
    );
  };

  const getCycleClass = (date: {
    year: number;
    month: number;
    day: number | undefined;
  }) => {
    const currentDate = new Date(date.year, date.month, date.day);
    const isPeriod = isPeriodDay(date);
    const isActiveCycle = dayjs(currentDate).isBetween(
      dayjs(periodDetails.start).subtract(1, 'day'),
      dayjs(periodDetails.end).add(1, 'day')
    );

    if (isActiveCycle) {
      return 'bg-red-200 rounded-full text-black font-medium w-10 h-10 justify-center items-center flex font-sans';
    } else if (isPeriod && !isActiveCycle) {
      return 'border border-red-300 border-dotted border-2 rounded-full w-10 h-10 justify-center items-center flex font-sans';
    } else {
      return 'font-sans';
    }
  };

  const dayTemplate = (date: any) => {
    const dayClass = getCycleClass(date);
    return <div className={dayClass}>{date.day}</div>;
  };

  return (
    <div className="w-full flex-col flex justify-center items-center gap-10">
      <Calendar
        value={today}
        // onChange={(e) => setToday(e.value)}
        inline
        className="w-2/5"
        dateTemplate={dayTemplate}
        readOnlyInput
      />
      <div className="px-5 py-3 rounded-xl bg-violet-300 w-max font-medium hover:bg-violet-400 hover:cursor-pointer">
        Log Periods
      </div>
    </div>
  );
};

export default CalendarComponent;
