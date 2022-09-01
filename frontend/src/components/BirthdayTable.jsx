import React, { useEffect, useState } from 'react';
import './BirthdayTable.css';
const axios = require('axios');

const URL = '/birthdays';

const BirthdayTable = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(true);

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
  }, [toggleRefresh]);

  const addBirthday = async () => {
    const updatedBirthdays = await axios.post('/birthdays', {
      newBirthday: { name: 'Mike', date: '1980-02-01' },
    });
    setBirthdays([...updatedBirthdays.data]);
  };

  const removeBirthday = async (birthdayId) => {
    const updatedBirthdays = await axios.delete(`/birthdays/${birthdayId}`);
    setBirthdays([...updatedBirthdays.data]);
  };

  return (
    <div>
      <h1>Friend's Birthdays</h1>
      <button onClick={addBirthday} className="add-birthday">
        +
      </button>
      <table>
        <tbody>
          {birthdays.map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.name}</td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => {
                      removeBirthday(appointment.id);
                    }}
                    className="remove-birthday"
                  >
                    -
                  </button>
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
