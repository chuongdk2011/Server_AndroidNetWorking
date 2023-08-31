var express = require('express');
var router = express.Router();

var api_truyen = require('../controllers/api/truyentranh.api.controller');
var api_u = require('../controllers/api/user.api.controller');



router.get('/truyen', api_truyen.listTruyen);

router.post('/truyen/addTruyen', api_truyen.addTruyen);

router.put('/truyen/updateTruyen/:id', api_truyen.updateTruyen);

router.delete('/truyen/delTruyen/:id', api_truyen.deleteTruyen); 

router.get('/truyen/:id',api_truyen.chitietTruyen);


router.get('/truyen/chitiet/:id',api_truyen.docTruyen);


router.get('/users', api_u.listUser);

router.post('/users/reg', api_u.reg); 

router.put('/users/update/:id',api_u.updatePass); 

router.delete('/users/delete/:id', api_u.delete); 

router.post('/users/login', api_u.login);


router.get('/binhluan/:id_truyen', api_truyen.listBinhLuan);


router.post('/binhluan/addBL', api_truyen.addBinhLuan);

router.put('/binhluan/updateBL/:id', api_truyen.updateBinhLuan);

router.delete('/binhluan/delBL/:id', api_truyen.deleteBinhLuan);

router.get('/yeuthich/:id',api_u.listYeuThichByUser);

router.post('/yeuthich/addYT',api_u.addYT);

router.get('/yeuthich',api_u.listYeuThich);

router.delete('/yeuthich/delYT/:id',api_u.delYT);

module.exports = router;