import express from 'express'
const router = express.Router();
import {birthdays} from "../data/birthdays.js"
import { getActiveBirthdays, capitalizeFirstLetter } from './apiHelpers.js';

//Counter for submitting new birthday entry
let id_counter = 4;

router.get('/birthdays', (req, res) => {
  res.send(getActiveBirthdays(birthdays));
})

router.post('/birthdays', async (req, res) => {
  const nameCapitalized = capitalizeFirstLetter(req.body.name)
  const formattedDate = new Date(req.body.date);
  birthdays.push({name: nameCapitalized, date: formattedDate, active: true, id: id_counter});
  id_counter += 1
  res.send(getActiveBirthdays(birthdays))
})

router.put('/birthdays/:id', (req, res) => {
  const indexNumber = ~~req.params.id - 1
  const nameCapitalized = capitalizeFirstLetter(req.body.name)
  console.log(nameCapitalized)
  const formattedDate = new Date(req.body.date);
  birthdays[indexNumber] = { id: indexNumber +1, name: nameCapitalized, date: formattedDate, active: true,}
  res.send(getActiveBirthdays(birthdays));
})

// Make deleted birthdays inactive
router.delete('/birthdays/:id', (req, res) => {
  const indexNumber = ~~req.params.id - 1
  birthdays[indexNumber] = {...birthdays[indexNumber], active: false}
  res.send(getActiveBirthdays(birthdays))
})

export default router;