import express from 'express'
const router = express.Router();
import {birthdays} from "../data/birthdays.js"

let id_counter = 4;

router.get('/birthdays', (req, res) => {
  res.send(birthdays.filter(birthday => {
    return birthday.active
  }))
})
router.post('/birthdays', async (req, res) => {
  const formattedDate = new Date(req.body.newBirthday.date);
  birthdays.push({...req.body.newBirthday, date: formattedDate, active: true, id: id_counter});
  console.log(birthdays)
  id_counter += 1
  res.send(birthdays.filter(birthday => {
    return birthday.active
  }))
})
router.put('/birthdays/:id', (req, res) => {
  const indexNumber = ~~req.params.id - 1
  res.send({type: 'put'})
})
router.delete('/birthdays/:id', (req, res) => {
  const indexNumber = ~~req.params.id - 1
  birthdays[indexNumber] = {...birthdays[indexNumber], active: false}
  console.log(birthdays)
  res.send(birthdays.filter(birthday => {
    return birthday.active
  }))
})

export default router;