import React, { useEffect, useState, useCallback } from 'react';
import { orderBy } from 'lodash';
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
  const [sortByCategory, setSortByCategory] = useState('name');
  const [sortDirection, setSortDirection] = useState('desc');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [editSubmitDisabled, setEditSubmitDisabled] = useState(true);

  //generic sort by name otherwise sort by date for array of objects
  //useCallback memoizes the function to not recreate it on every load and the only time
  //the function needs to recreate is if sortByCategory cshanges
  const sortEntries = useCallback(
    (data) => {
      return orderBy(data, sortByCategory, sortDirection);
    },
    [sortByCategory, sortDirection]
  );

  //Functions

  const checkValidEntry = (name, birthday, stateFn) => {
    if (name && birthday.length > 9) {
      stateFn(false);
    } else {
      stateFn(true);
    }
  };

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
  }, [sortByCategory, sortEntries]);

  useEffect(() => {
    checkValidEntry(newNameEntry, newBirthdayEntry, setSubmitDisabled);
  }, [newNameEntry, newBirthdayEntry]);

  useEffect(() => {
    checkValidEntry(editNameEntry, editBirthdayEntry, setEditSubmitDisabled);
  }, [editNameEntry, editBirthdayEntry]);

  //Rest of API calls

  const addBirthday = useCallback(async () => {
    try {
      const updatedBirthdays = await axios.post('/birthdays', {
        name: newNameEntry,
        date: newBirthdayEntry,
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
        <button
          onClick={addBirthday}
          className={submitDisabled ? 'inactive-add' : 'add-birthday'}
          disabled={submitDisabled}
        >
          +
        </button>
      </form>
      <div className="sort-by-container">
        <span>sort by: </span>
        <select
          value={sortByCategory}
          onChange={(e) => {
            setSortByCategory(e.target.value);
          }}
        >
          <option value="name">name</option>
          <option value="date">date</option>
        </select>
        <select
          value={sortDirection}
          onChange={(e) => {
            setSortDirection(e.target.value);
          }}
        >
          <option value="desc">descending</option>
          <option value="asc">ascending</option>
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
            editSubmitDisabled={editSubmitDisabled}
          />
        )}
      </div>
    </div>
  );
};

export default BirthdayDisplay;
