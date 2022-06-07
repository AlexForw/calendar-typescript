import { useMemo, useState } from "react";
import { createDate } from "../../date/createDate";
import { createMonth } from "../../date/createMonth";
import { getMonthNames } from "../../date/getMonthNames";

interface UseCalendarParams {
    locale?: string;
    selectedDate: Date;
}

export const useCalendar = ({ locale = 'default', selectedDate: date }: UseCalendarParams) => {
    const [mode, setMode] = useState<'days' | 'monthes' | 'years'>('days')

    const [selectedDate, setSelectedDate] = useState(createDate({ date }))
    const [selectedMonth, setSelectedMonth] = useState(createMonth({ date: new Date(selectedDate.year, selectedDate.monthIndex), locale }))
    const [selectedYear, setSelectedYear] = useState(selectedDate.year)

    const monthNames = useMemo(() => getMonthNames(locale), [])
    console.log('monthNames', monthNames);
    return {}
}