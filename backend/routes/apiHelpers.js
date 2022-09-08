//return active birthdays
export const getActiveBirthdays = (birthdayList) => {
  return birthdayList.filter(birthday => {
    return birthday.active
  });
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}