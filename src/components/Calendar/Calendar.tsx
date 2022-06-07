import { useCalendar } from "./useCalendar";

interface CalendarProps {
    locale?: string;
    selectedDate: Date;
    selectDate: (date: Date) => void;
    firstWeekDay?: number;
}

const Calendar: React.FC<CalendarProps> = ({ locale = 'default', selectDate, selectedDate}) => {
    const { } = useCalendar({ locale, selectedDate })
    return (
        <div>
            Calendar
        </div>
    );
};

export default Calendar;