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
                <div className='calendar__arrow-left'/>
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
        </div>
    );
};

export default Calendar;