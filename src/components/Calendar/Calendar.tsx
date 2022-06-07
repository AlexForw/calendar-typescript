interface CalendarProps {
    locale?: string;
    selectedDate: Date;
    selectDate: (date: Date) => void
}

const Calendar: React.FC<CalendarProps> = () => {
    return (
        <div>
            Calendar
        </div>
    );
};

export default Calendar;