import React, { useEffect, useState } from 'react';
import './BirthdayTable.css';
const axios = require('axios');

const URL = '/birthdays';

const BirthdayTable = () => {
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    const getBirthdays = async () => {
      try {
        const updatedBirthdays = await axios.get(URL);
        console.log(updatedBirthdays);
        setBirthdays([...updatedBirthdays.data]);
      } catch (err) {
        console.log(err);
      }
    };

    getBirthdays();
  }, []);

  return (
    <div>
      <h1>Friend's Birthdays</h1>
      <button className="add-birthday">+</button>
      <table>
        <tbody>
          {birthdays.map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.name}</td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>
                  <button className="remove-birthday">-</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BirthdayTable;
