import React, { useEffect, useState, useLayoutEffect } from 'react';
import './BirthdayTable.css';
import EditBox from './EditBox';
const axios = require('axios');

const URL = '/birthdays';

const BirthdayTable = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState('');
  const [newNameEntry, setNewNameEntry] = useState('');
  const [newBirthdayEntry, setNewBirthdayEntry] = useState('');
  const [editNameEntry, setEditNameEntry] = useState('');
  const [editBirthdayEntry, setEditBirthdayEntry] = useState('');
  const [editId, setEditId] = useState(0);
  const [sortBy, setSortBy] = useState('name');

  const sortEntries = (data) => {
    console.log('sortentriesdata', data);
    if (sortBy === 'name') {
      return data.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return data.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  };

  useEffect(() => {
    const getBirthdays = async () => {
      try {
        const updatedBirthdays = await axios.get(URL);
        const sortedBirthdays = await sortEntries(updatedBirthdays.data);
        setBirthdays([...sortedBirthdays]);
      } catch (err) {
        console.log(err);
      }
    };

    getBirthdays();
  }, [sortBy]);

  const closeEditBox = () => {
    setEditOpen(false);
  };

  const clearEditFields = () => {
    setEditNameEntry('');
    setEditBirthdayEntry('');
  };

  const editNameOnChange = (e) => {
    setEditNameEntry(e.target.value);
  };
  const editBirthdayOnChange = (e) => {
    setEditBirthdayEntry(e.target.value);
  };

  const addBirthday = async () => {
    const updatedBirthdays = await axios.post('/birthdays', {
      newBirthday: { name: newNameEntry, date: newBirthdayEntry },
    });
    const sortedBirthdays = await sortEntries(updatedBirthdays.data);
    setBirthdays([...sortedBirthdays]);
    setNewNameEntry('');
    setNewBirthdayEntry('');
  };

  const removeBirthday = async (birthdayId) => {
    const updatedBirthdays = await axios.delete(`/birthdays/${birthdayId}`);
    const sortedBirthdays = await sortEntries(updatedBirthdays.data);
    setBirthdays([...sortedBirthdays]);
  };

  const editEntryOnClick = async (birthdayId) => {
    const updatedBirthdays = await axios.put(`/birthdays/${birthdayId}`, {
      name: editNameEntry,
      date: editBirthdayEntry,
    });
    const sortedBirthdays = await sortEntries(updatedBirthdays.data);
    setBirthdays([...sortedBirthdays]);
    closeEditBox();
  };

  return (
    <div className="main-container">
      <h1>Friend's Birthdays</h1>
      <form className="new-entry" onSubmit={(e) => e.preventDefault()}>
        <label>Name: </label>
        <input
          className="header-input"
          value={newNameEntry}
          onChange={(e) => setNewNameEntry(e.target.value)}
        ></input>
        <label className="birthday-text">Birthday (yyyy/mm/dd): </label>
        <input
          className="header-input"
          value={newBirthdayEntry}
          maxLength="10"
          onChange={(e) => setNewBirthdayEntry(e.target.value)}
        ></input>
        <button onClick={addBirthday} className="add-birthday">
          +
        </button>
      </form>
      <div className="sort-by-container">
        <span>sort by: </span>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="name">name</option>
          <option value="date">date</option>
        </select>
      </div>
      <div className={editOpen ? 'table-edit-container' : 'table-container'}>
        <table>
          <tbody>
            {birthdays.map((birthday) => {
              return (
                <tr key={birthday.id}>
                  <td>{birthday.name}</td>
                  <td>{new Date(birthday.date).toDateString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        removeBirthday(birthday.id);
                        if (editOpen) closeEditBox();
                      }}
                      className="remove-birthday"
                    >
                      -
                    </button>
                    <button
                      onClick={() => {
                        setEditId(birthday.id);
                        setCurrentlyEditing(birthday.name);
                        setEditOpen(true);
                        setEditNameEntry(birthday.name);
                        setEditBirthdayEntry(
                          birthday.date
                            .toString()
                            .replace(/-/g, '/')
                            .substring(0, 10)
                        );
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

        {editOpen && (
          <EditBox
            currentlyEditing={currentlyEditing}
            closeEditBox={closeEditBox}
            editNameEntry={editNameEntry}
            editBirthdayEntry={editBirthdayEntry}
            nameOnChange={editNameOnChange}
            bdayOnChange={editBirthdayOnChange}
            clearEditFields={clearEditFields}
            editEntryOnClick={editEntryOnClick}
            editId={editId}
          />
        )}
      </div>
    </div>
  );
};

export default BirthdayTable;
