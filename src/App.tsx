import './App.css'
import Calendar from './components/Calendar/Calendar';
import { createDate } from './date/createDate';
import { createMonth } from './date/createMonth'
import { createYear } from './date/createYear';


function App() {
  console.log('createYear',createYear().createYearMonthes());
  
  
  return (
    <div className="app">
      <Calendar />
    </div>
  );
}

export default App;
