import React, { useEffect, useState } from 'react';
import './BirthdayTable.css';
const axios = require('axios');

const URL = '/birthdays';

const BirthdayTable = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [nameEntry, setNameEntry] = useState('');
  const [birthdayEntry, setBirthdayEntry] = useState('');

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

  const addBirthday = async () => {
    const updatedBirthdays = await axios.post('/birthdays', {
      newBirthday: { name: nameEntry, date: birthdayEntry },
    });
    setBirthdays([...updatedBirthdays.data]);
    setNameEntry('');
    setBirthdayEntry('');
  };

  const removeBirthday = async (birthdayId) => {
    const updatedBirthdays = await axios.delete(`/birthdays/${birthdayId}`);
    setBirthdays([...updatedBirthdays.data]);
  };

  return (
    <div>
      <h1>Friend's Birthdays</h1>
      <label>Name: </label>
      <input
        value={nameEntry}
        onChange={(e) => setNameEntry(e.target.value)}
      ></input>
      <label className="birthday-text">Birthday (yyyy/mm/dd): </label>
      <input
        value={birthdayEntry}
        maxLength="10"
        onChange={(e) => setBirthdayEntry(e.target.value)}
      ></input>
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
                  <button
                    onClick={() => {
                      removeBirthday(appointment.id);
                    }}
                    className="edit-birthday"
                  >
                    ...
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
