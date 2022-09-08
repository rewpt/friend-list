import React, { useEffect, useState, useCallback } from 'react';
import './BirthdayDisplay.css';
import BirthdayTable from './BirthdayTable';
import EditBox from './EditBox';
const axios = require('axios');

const BirthdayDisplay = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState('');
  const [newNameEntry, setNewNameEntry] = useState('');
  const [newBirthdayEntry, setNewBirthdayEntry] = useState('');
  const [editNameEntry, setEditNameEntry] = useState('');
  const [editBirthdayEntry, setEditBirthdayEntry] = useState('');
  const [editId, setEditId] = useState(0);
  const [sortBy, setSortBy] = useState('name');

  //generic sort by name otherwise sort by date for array of objects
  //useCallback memoizes the function to not recreate it on every load and the only time
  //the function needs to recreate is if sortBy cshanges
  const sortEntries = useCallback(
    (data) => {
      if (sortBy === 'name') {
        return data.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        return data.sort((a, b) => new Date(a.date) - new Date(b.date));
      }
    },
    [sortBy]
  );

  //Functions

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

  // Initial API call. Fetch birthdays on load => sort => set into state
  useEffect(() => {
    const getBirthdays = async () => {
      try {
        const updatedBirthdays = await axios.get('/birthdays');
        const sortedBirthdays = await sortEntries(updatedBirthdays.data);
        setBirthdays([...sortedBirthdays]);
      } catch (err) {
        console.log('loaderror', err);
      }
    };

    getBirthdays();
  }, [sortEntries]);

  // another use Effect to avoid recalling api when select is changed
  useEffect(() => {
    setBirthdays((prev) => sortEntries([...prev]));
  }, [sortBy, sortEntries]);

  //Rest of API calls

  const addBirthday = useCallback(async () => {
    try {
      const updatedBirthdays = await axios.post('/birthdays', {
        newBirthday: { name: newNameEntry, date: newBirthdayEntry },
      });
      const sortedBirthdays = await sortEntries(updatedBirthdays.data);
      setBirthdays([...sortedBirthdays]);
      setNewNameEntry('');
      setNewBirthdayEntry('');
    } catch (err) {
      console.log('addBirthday error: ', err);
    }
  }, [newNameEntry, newBirthdayEntry, sortEntries]);

  const removeBirthday = useCallback(
    async (birthdayId) => {
      try {
        const updatedBirthdays = await axios.delete(`/birthdays/${birthdayId}`);
        const sortedBirthdays = await sortEntries(updatedBirthdays.data);
        setBirthdays([...sortedBirthdays]);
      } catch (err) {
        console.log('removeBirthdays error:', err);
      }
    },
    [sortEntries]
  );

  const editEntryOnClick = useCallback(
    async (birthdayId) => {
      try {
        const updatedBirthdays = await axios.put(`/birthdays/${birthdayId}`, {
          name: editNameEntry,
          date: editBirthdayEntry,
        });
        const sortedBirthdays = await sortEntries(updatedBirthdays.data);
        setBirthdays([...sortedBirthdays]);
        closeEditBox();
      } catch (err) {
        console.log('editEntry Error: ', err);
      }
    },
    [sortEntries, closeEditBox, editBirthdayEntry, editNameEntry]
  );

  const openEditOnClick = useCallback((birthday) => {
    setEditId(birthday.id);
    setCurrentlyEditing(birthday.name);
    setEditOpen(true);
    setEditNameEntry(birthday.name);
    setEditBirthdayEntry(
      birthday.date.toString().replace(/-/g, '/').substring(0, 10)
    );
  }, []);

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
        <BirthdayTable
          birthdays={birthdays}
          openEditOnClick={openEditOnClick}
          editOpen={editOpen}
          removeBirthday={removeBirthday}
          closeEditBox={closeEditBox}
        />
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

export default BirthdayDisplay;
