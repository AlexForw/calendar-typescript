import { useState } from 'react';
import './App.css'
import Calendar from './components/Calendar/Calendar';
import { formatDate } from './date/formatDate';



function App() {
  const [selectedDate, selectDate] = useState(new Date())

  return (
    <div className="app">
      <div className="date__container">{formatDate(selectedDate, 'DD MM YYYY')}</div>
      <Calendar selectDate={selectDate} selectedDate={selectedDate} />
    </div>
  );
}

export default App;
