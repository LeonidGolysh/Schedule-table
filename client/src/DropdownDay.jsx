import { useState } from "react";
import "./App.css";

const DropdownDay = (props) => {
  const { options2, selectedOption2, onOptionSelect2 } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onOptionSelect2(option);
    toggleDropdown();
  };

  return (
    <div className="weekday-select dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption2.label}
        <i className={`fas fa-angle-${isOpen ? "up" : "down"}`}></i>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options2.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownDay;