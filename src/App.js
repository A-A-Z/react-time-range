import './App.css';

import TimeRange from './TimeRange/component/TimeRangeComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Time range Input</h1>
        <TimeRange
          startTimeValue="9:30"
          endTimeValue="17:45"
        />
      </header>
      
    </div>
  );
}

export default App;
