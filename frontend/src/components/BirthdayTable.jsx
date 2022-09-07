import React from 'react';

const BirthdayTable = (props) => {
  const { birthdays, openEditOnClick, removeBirthday, editOpen, closeEditBox } =
    props;

  return (
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
                  onClick={() => openEditOnClick(birthday)}
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
  );
};

export default BirthdayTable;
