import { checkDateIsEqual } from "../../date/checkDateIsEqual";
import { checkIsToday } from "../../date/checkIsToday";
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
                <div className='calendar__arrow-left' onClick={() => functions.onClickArrow('left')} />
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
                <div className='calendar__arrow-right' onClick={() => functions.onClickArrow('right')} />
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
                                const isToday = checkIsToday(day.date);
                                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDate.date);
                                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;

                                return (
                                    <div key={`${day.dayNumber}-${day.monthIndex}`}
                                        onClick={() => {
                                            selectDate(day.date);
                                            functions.setSelectedDate(day)
                                        }}
                                        className={[
                                            'calendar__day',
                                            isToday ? 'calendar__today-item' : '',
                                            isSelectedDay ? 'calendar__selected-item' : '',
                                            isAdditionalDay ? 'calendar__additional-day' : ''
                                        ].join(' ')}>
                                        {day.dayNumber}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {state.mode === 'monthes' && (
                    <div className='pick-items__container'>
                        {state.monthNames.map((monthName) => {
                            const isCurrentMonth =
                                new Date().getMonth() === monthName.monthIndex &&
                                state.selectedYear === new Date().getFullYear();
                            const isSelectedMonth = monthName.monthIndex === state.selectedMonth.monthIndex;

                            return (
                                <div
                                    key={monthName.month}
                                    aria-hidden
                                    onClick={() => {
                                        functions.setSelectedMonthByIndex(monthName.monthIndex);
                                        functions.setMode('days');
                                    }}
                                    className={[
                                        'calendar__pick-item',
                                        isSelectedMonth ? 'calendar__selected-item' : '',
                                        isCurrentMonth ? 'calendar__today-item' : ''
                                    ].join(' ')}
                                >
                                    {monthName.monthShort}
                                </div>
                            );
                        })}
                    </div>
                )}


                {state.mode === 'years' && (
                    <div className='pick-items__container'>
                        <div className='calendar__unchoosable-year'>{state.selectedYearsInterval[0] - 1}</div>
                        {state.selectedYearsInterval.map((year) => {
                            const isCurrentYear = new Date().getFullYear() === year;
                            const isSelectedYear = year === state.selectedYear;

                            return (
                                <div
                                    key={year}
                                    aria-hidden
                                    onClick={() => {
                                        functions.setSelectedYear(year);
                                        functions.setMode('monthes');
                                    }}
                                    className={[
                                        'calendar__pick-item',
                                        isCurrentYear ? 'calendar__today-item' : '',
                                        isSelectedYear ? 'calendar__selected-item' : ''
                                    ].join(' ')}
                                >
                                    {year}
                                </div>
                            );
                        })}
                        <div className='calendar__unchoosable-year'>
                            {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calendar;