import React from 'react';
import './EditBox.css';

const EditModal = (props) => {
  const {
    currentlyEditing,
    editNameEntry,
    editBirthdayEntry,
    nameOnChange,
    bdayOnChange,
    closeEditBox,
    clearEditFields,
    editEntryOnClick,
    editId,
  } = props;

  return (
    <div className="edit-container">
      <h2>Edit Entry</h2>
      <span className="close-edit" onClick={closeEditBox}>
        x
      </span>
      <form className="form-container" onSubmit={(e) => e.preventDefault()}>
        <span className="change-entry">Change Entry: {currentlyEditing}</span>
        <label>name: </label>
        <input
          onChange={nameOnChange}
          value={editNameEntry}
          className="name-input"
        ></input>
        <label>Birthday (yyyy/mm/dd): </label>
        <input onChange={bdayOnChange} value={editBirthdayEntry}></input>
        <div className="edit-buttons-container">
          <button
            className="accept-change"
            onClick={() => editEntryOnClick(editId)}
          >
            ✔︎
          </button>
          <button onClick={clearEditFields} className="clear-edits">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
