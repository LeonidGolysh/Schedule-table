import './App.css';
import React, { useState, useEffect } from "react";
import ScheduleTable from './ScheduleTable';
import DropdownGroup from './DropdownGroup';
import DropdownDay from './DropdownDay';
// import 'bootstrap/dist/css/bootstrap.min.css';

const options1 = [
  { value: "option1", label: "111" },
  { value: "option2", label: "121" },
  { value: "option3", label: "131" },
  { value: "option4", label: "132" },
  { value: "option5", label: "141" },
  { value: "option6", label: "211" },
  { value: "option7", label: "212" },
  { value: "option8", label: "221" },
  { value: "option9", label: "222" },
];

const options2 = [
  { value: "monday", label: "Понеділок" },
  { value: "tuesday", label: "Вівторок" },
  { value: "wednesday", label: "Середа" },
  { value: "thursday", label: "Четвер" },
  { value: "friday", label: "П'ятниця" },
];

function App() {
  const [selectedOption1, setSelectedOption1] = useState(options1[0]);
  const [selectedOption2, setSelectedOption2] = useState(options2[0]);
  const [selectedDay, setSelectedDay] = useState(options2[0].label);
  const [selectedGroup, setSelectedGroup] = useState(options1[0].label);
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/schedule')
      .then(response => response.json())
      .then(data => setScheduleData(data));
  }, []);

  const handleOptionSelect1 = (option) => {
    setSelectedOption1(option);
    setSelectedGroup(option.label);
  }

  const handleOptionSelect2 = (option) => {
    setSelectedOption2(option);
    setSelectedDay(option.label);
  }

  return (
    <div className="App">
      <div className="header-dropdown">
        <div className="header-dropdown-group">
          <DropdownGroup options1={options1} selectedOption1={selectedOption1} onOptionSelect1={handleOptionSelect1} />
        </div>
        <div className="header-dropdown-day">
          <DropdownDay options2={options2} selectedOption2={selectedOption2} onOptionSelect2={handleOptionSelect2} />
        </div>
      </div>
      <div className="scheduleData">
        <ScheduleTable scheduleData={scheduleData} day={selectedDay} group={selectedGroup} />
      </div>
    </div>
  );
}

export default App;