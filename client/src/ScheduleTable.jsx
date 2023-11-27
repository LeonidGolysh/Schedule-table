import "./App.css";

const ScheduleTable = (props) => {
  const { scheduleData, day, group } = props;
  const rows = [];

  const removeDuplicates = (data) => {
    const uniqueRows = [];

    data.forEach((row) => {
      let isDistinct = true;

      uniqueRows.forEach((uniqueRow) => {
        if (
          uniqueRow.time_start === row.time_start &&
          uniqueRow.day_name === row.day_name &&
          uniqueRow.group_number == row.group_number
        ) {
          isDistinct = false;
          return;
        }
      });

      if (isDistinct) {
        uniqueRows.push(row);
      }
    });
    return uniqueRows;
  };

  const uniqueData = removeDuplicates(scheduleData);

  uniqueData.filter((item) => item.group_number == group && item.day_name === day).forEach((row, index) => {
    const scheduleData2 = scheduleData.filter(item => item.group_number == group && item.day_name === day && item.time_start === row.time_start);
    
      const subject = scheduleData2.map((row, index) => (
        <span key={index}> {row.name_subject}</span>
      ));
    
    const room = scheduleData2.map((row, index) => (
      <span key={index}> {row.room_number }</span>
    ));
    
    rows.push(
      <tr key={index}>
        <td className="time-table">{row.time_start} - {row.time_end}</td>
        <td>{subject}</td>
        <td>{room}</td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>{group}</th>
          <th>{day}</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

export default ScheduleTable;