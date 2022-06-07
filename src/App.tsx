import { useState } from 'react';
import './App.css'
import Calendar from './components/Calendar/Calendar';
import { createDate } from './date/createDate';
import { createMonth } from './date/createMonth'
import { createYear } from './date/createYear';
import { getMonthNames } from './date/getMonthNames';


function App() {
  const [selectedDate, selectDate] = useState(new Date())

  return (
    <div className="app">
      <Calendar selectDate={selectDate} selectedDate={selectedDate} />
    </div>
  );
}

export default App;
