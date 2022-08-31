import React, { useEffect, useState } from 'react';
const axios = require('axios');

const URL = '/appointments';

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const updatedAppointments = await axios.get(URL);
        console.log(updatedAppointments);
        setAppointments([...updatedAppointments.data]);
      } catch (err) {
        console.log(err);
      }
    };

    getAppointments();
  }, []);

  return (
    <div>
      <table>
        <tbody>
          {appointments.map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
