import React, { useEffect } from 'react';
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
      <tr>
        {appointments.map((appointment) => {
          return <td>{appointment.name}</td>;
        })}
      </tr>
    </div>
  );
};

export default AppointmentTable;
