const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.log(`Error connecting to the database: ${err}`);
    return;
  }
  console.log('connected to MySQL database');
});

const app = express();
app.use(cors());

app.get('/schedule', (req, res) => {
  const query = 'SELECT day_name, group_number, room_number, name_subject, time_start, time_end, `timetable-model`.time_slots.id_time_slot \
   FROM `timetable-model`.schedule_items \
  JOIN`timetable-model`.days ON`timetable-model`.schedule_items.id_day = `timetable-model`.days.id_day \
LEFT JOIN`timetable-model`.subjects ON`timetable-model`.schedule_items.id_subject = `timetable-model`.subjects.id_subject \
  JOIN`timetable-model`.group ON`timetable-model`.schedule_items.id_group = `timetable-model`.group.id_group \
LEFT JOIN`timetable-model`.rooms ON`timetable-model`.schedule_items.id_schedule_items = `timetable-model`.rooms.schedule_items_id_schedule_items \
  JOIN`timetable-model`.time_slots ON`timetable-model`.schedule_items.id_time_slot = `timetable-model`.time_slots.id_time_slot \
ORDER BY`timetable-model`.time_slots.id_time_slot; ';
  connection.query(query, (err, results) => {
    if (err) {
      console.log(`Error fetching schedule records: ${err}`);
      res.status(500).send('Internal server error');
      return;
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});