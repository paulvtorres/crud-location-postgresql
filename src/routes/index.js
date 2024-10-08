const { Router} =  require('express');
const router = Router();

const { getLocations, getLocationByPhoneNum, getHistory, saveLocation, saveHistory, saveName, addPerson, getPersons/*, deleteUser, updateUser*/ } = require('../controllers/index.controller');

router.get('/all',getLocations);
router.get('/list/:phoneNum',getLocationByPhoneNum);
router.get('/history/:phoneNum', getHistory);
router.post('/location',saveLocation);
router.post('/history', saveHistory);
router.post('/name', saveName);
router.get('/persons', getPersons);
router.post('/person', addPerson);
/*router.delete('/users/:id',deleteUser);
router.put('/users/:id',updateUser);*/

module.exports = router;