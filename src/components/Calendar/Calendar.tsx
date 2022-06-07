import { useCalendar } from "./useCalendar";

interface CalendarProps {
    locale?: string;
    selectedDate: Date;
    selectDate: (date: Date) => void;
    firstWeekDay?: number;
}

const Calendar: React.FC<CalendarProps> = ({ locale = 'default', selectDate, selectedDate }) => {
    const { state } = useCalendar({ locale, selectedDate })
    console.log('state', state);

    return (
        <div>
            Calendar
        </div>
    );
};

export default Calendar;