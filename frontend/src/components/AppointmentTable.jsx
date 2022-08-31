import React, { useEffect, useState } from 'react';
const axios = require('axios');

const URL = '/appointments';

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const updatedAppointments = await axios.get(URL);
        setAppointments(updatedAppointments);
      } catch (err) {
        console.log(err);
      }
    };

    getAppointments();
  }, []);

  return (
    <div>
      <table>
        {appointments.map((appointment) => {
          return <td>{appointment.name}</td>;
        })}
      </table>
    </div>
  );
};

export default AppointmentTable;
