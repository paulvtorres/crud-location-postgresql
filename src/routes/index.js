const { Router} =  require('express');
const router = Router();

const { getLocations, getLocationByPhoneNum, saveLocation, saveHistory, saveName/*, deleteUser, updateUser*/ } = require('../controllers/index.controller');

router.get('/all',getLocations);
router.get('/list/:phoneNum',getLocationByPhoneNum);
router.post('/location',saveLocation);
router.post('/history', saveHistory);
router.post('/name', saveName);
/*router.delete('/users/:id',deleteUser);
router.put('/users/:id',updateUser);*/

module.exports = router;