import './App.css'
import { createDate } from './date/createDate';
import { createMonth } from './date/createMonth'
import { createYear } from './date/createYear';


function App() {
  console.log('createYear',createYear().createYearMonthes());
  
  
  return (
    <div className="app">
      calendar
    </div>
  );
}

export default App;
