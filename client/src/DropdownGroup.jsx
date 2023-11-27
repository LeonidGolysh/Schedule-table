import { useState } from "react";
import "./App.css";

const DropdownGroup = (props) => {
  const { options1, selectedOption1, onOptionSelect1 } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onOptionSelect1(option);
    toggleDropdown();
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption1.label}
        <i className={`fas fa-angle-${isOpen ? "up" : "down"}`}></i>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options1.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownGroup;