import { useCalendar } from "./useCalendar";

interface CalendarProps {
    locale?: string;
    selectedDate: Date;
    selectDate: (date: Date) => void;
    firstWeekDay?: number;
}

const Calendar: React.FC<CalendarProps> = ({ locale = 'default', selectDate, selectedDate }) => {
    const { state, functions } = useCalendar({ locale, selectedDate })

    return (
        <div className='calendar'>
            <div className='calendar__header'>
                <div className='calendar__arrow-left' />
                {state.mode === 'days' && (
                    <div className="calendar__header-clickable" onClick={() => functions.setMode('monthes')}>
                        {state.monthNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
                    </div>
                )}
                {state.mode === 'monthes' && (
                    <div className="calendar__header-clickable" onClick={() => functions.setMode('years')}>
                        {state.selectedYear}
                    </div>
                )}
                {state.mode === 'years' && (
                    <div className="calendar__header-clickable" onClick={() => functions.setMode('days')}>
                        {state.selectedYearsInterval[0]} -{' '}
                        {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
                    </div>
                )}
                <div className='calendar__arrow-right' />
            </div>

            <div className='calendar__body'>
                {state.mode === 'days' && (
                    <>
                        <div className='calendar__week-names'>
                            {state.weekDaysNames.map((weekDaysName) => (
                                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
                            ))}
                        </div>
                        <div className='calendar__days'>
                            {state.calendarDays.map((day) => {
                                return (
                                    <div key={`${day.dayNumber}-${day.monthIndex}`}
                                        onClick={() => {
                                            selectDate(day.date);
                                        }}
                                        className='calendar__day'
                                    >
                                        {day.dayNumber}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Calendar;