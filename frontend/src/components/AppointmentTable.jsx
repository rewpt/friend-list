import React, { useEffect } from 'react';
const axios = require('axios');

const AppointmentTable = () => {
  useEffect(() => {
    const fetchAppointments = () => {
      axios.get(localhost);
    };
  }, []);

  return <div>AppointmentTable</div>;
};

export default AppointmentTable;
