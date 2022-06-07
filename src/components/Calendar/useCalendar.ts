import { useMemo, useState } from "react";
import { createDate } from "../../date/createDate";
import { createMonth } from "../../date/createMonth";
import { getMonthDays } from "../../date/getMonthDays";
import { getMonthNames } from "../../date/getMonthNames";
import { getWeekDaysNames } from "../../date/getWeekDaysNames";
import { getYearsInterval } from "../../date/getYearsInterval";

interface UseCalendarParams {
    locale?: string;
    selectedDate: Date;
    firstWeekDay?: number;
}

export const useCalendar = ({ locale = 'default', selectedDate: date, firstWeekDay = 2 }: UseCalendarParams) => {
    const [mode, setMode] = useState<'days' | 'monthes' | 'years'>('days')

    const [selectedDate, setSelectedDate] = useState(createDate({ date }))
    const [selectedMonth, setSelectedMonth] = useState(createMonth({ date: new Date(selectedDate.year, selectedDate.monthIndex), locale }))
    const [selectedYear, setSelectedYear] = useState(selectedDate.year)
    const [selectedYearsInterval, setSelectedYearsInterval] = useState(getYearsInterval(selectedDate.year));

    const monthNames = useMemo(() => getMonthNames(locale), [])
    const weekDaysNames = useMemo(() => getWeekDaysNames(firstWeekDay, locale), [])

    const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear])

    const calendarDays = useMemo(() => {
        const monthDays = getMonthDays(selectedMonth.monthIndex, selectedYear)


        const prevMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex - 1),
            locale
        }).createMonthDays();

        const nextMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex + 1),
            locale
        }).createMonthDays();

        const firstDay = days[0]
        const lastDay = days[monthDays - 1]

        const shiftIndex = firstWeekDay - 1
        const numberOfPrevDays = firstDay.dayNumberInWeek - 1 - shiftIndex < 0
            ? 7 - (firstWeekDay - firstDay.dayNumberInWeek)
            : firstDay.dayNumberInWeek - 1 - shiftIndex;

        const numberOfNextDays = 7 - lastDay.dayNumberInWeek + shiftIndex > 6
            ? 7 - lastDay.dayNumberInWeek - (7 - shiftIndex)
            : 7 - lastDay.dayNumberInWeek + shiftIndex;


        const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

        const result = [];

        for (let i = 0; i < numberOfPrevDays; i += 1) {
            const inverted = numberOfPrevDays - i;
            result[i] = prevMonthDays[prevMonthDays.length - inverted];
        }

        for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
            result[i] = days[i - numberOfPrevDays];
        }

        for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
            result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
        }

        return result;
    }, [selectedMonth.monthIndex, selectedMonth.year, selectedYear])


    const onClickArrow = (direction: 'right' | 'left') => {
        if (mode === 'years' && direction === 'left') {
            return setSelectedYearsInterval(getYearsInterval(selectedYearsInterval[0] - 10));
        }

        if (mode === 'years' && direction === 'right') {
            return setSelectedYearsInterval(getYearsInterval(selectedYearsInterval[0] + 10));
        }

        if (mode === 'monthes' && direction === 'left') {
            const year = selectedYear - 1;
            if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
            return setSelectedYear(selectedYear - 1);
        }

        if (mode === 'monthes' && direction === 'right') {
            const year = selectedYear + 1;
            if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
            return setSelectedYear(selectedYear + 1);
        }

        if (mode === 'days') {
            const monthIndex =
                direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;
            if (monthIndex === -1) {
                const year = selectedYear - 1;
                setSelectedYear(year);
                if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
                return setSelectedMonth(createMonth({ date: new Date(selectedYear - 1, 11), locale }));
            }

            if (monthIndex === 12) {
                const year = selectedYear + 1;
                setSelectedYear(year);
                if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
                return setSelectedMonth(createMonth({ date: new Date(year, 0), locale }));
            }

            setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
        }
    };

    const setSelectedMonthByIndex = (monthIndex: number) => {
        setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
    };


    return {
        state: {
            mode,
            calendarDays,
            weekDaysNames,
            monthNames,
            selectedDate,
            selectedMonth,
            selectedYear,
            selectedYearsInterval,
        },
        functions: {
            setMode,
            setSelectedDate,
            onClickArrow,
            setSelectedMonthByIndex,
            setSelectedYear,
        }
    }
}