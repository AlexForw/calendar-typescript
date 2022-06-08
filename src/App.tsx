import { useEffect, useState } from 'react';
import './App.css'
import Calendar from './components/Calendar/Calendar';
import { formatDate } from './date/formatDate';



function App() {
  const [selectedDate, selectDate] = useState(new Date())
  const [localeState, setLocaleState] = useState('ru')
  console.log(localeState);

  return (
    <div className="app">

      <select name='language' onChange={(e) => setLocaleState(e.target.value)} className='change-language'>
        <option value="ru">RU</option>
        <option value="zh">CH</option>
        <option value="en-US">EN</option>
      </select>

      <div className="date__container">{formatDate(selectedDate, 'DD MM YYYY')}</div>
      <Calendar locale={localeState} selectDate={selectDate} selectedDate={selectedDate} />
    </div>
  );
}

export default App;
