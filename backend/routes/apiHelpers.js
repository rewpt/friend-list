//return active birthdays
export const getActiveBirthdays = (birthdayList) => {
  return birthdayList.filter(birthday => {
    return birthday.active
  });
}