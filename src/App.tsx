import './App.css'
import { createDate } from './date/createDate';
import { createMonth } from './date/createMonth'


function App() {
  console.log(createDate({locale:'en-US'}));
  
  return (
    <div className="app">
      calendar
    </div>
  );
}

export default App;
