var md = require('../../models/truyentranh.model');
var sock = require('../../socket_server');
//tạo đối tượng mẫu dữ lieuj trả về
var objReturn = {
    status: 1,
    msg: 'ok'
}

var objReturn1 = {
    status: 1,
    msg: 'ok'
}
var objReturn2 = {
    status: 1,
    msg: 'ok'
}




exports.listTruyen = async (req, res, next) => {

    let listTruyen = []

    let dieu_kien_loc = null;

    if (typeof (req.query.tentruyen) != 'undefined') {
        dieu_kien_loc = { tentruyen: new RegExp('.*'+req.query.tentruyen +'.*',"i") };
    }

    try {
        listTruyen = await md.truyenModel.find(dieu_kien_loc);

        if (listTruyen) {
            objReturn.data = listTruyen;
            objReturn.status = 1;
            objReturn.msg = 'lấy ds thành công';
        } else {
            objReturn.status = 0;
            objReturn.msg = 'không có  dữ liệu'
        }
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }


    res.json(objReturn.data);
}

exports.docTruyen = async (req,res,next) =>  {
        const truyen = await md.truyenModel.findById(req.params.id);
    
        let anhnd = truyen.anhnoidung;
       
        try {

            if (anhnd) {
                objReturn.anhnoidung = anhnd;
                objReturn.status = 1;
                objReturn.msg = 'lấy ds thành công';
            } else {
                objReturn.status = 0;
                objReturn.msg = 'không có  dữ liệu'
            }
        } catch (error) {
            objReturn.status = 0;
            objReturn.msg = error.msg;
        }
    
    
        res.json(objReturn.anhnoidung);

}
exports.chitietTruyen = async (req,res,next) =>  {

    let listTruyen = []
    
    try {
        listTruyen = await md.truyenModel.find({_id: req.params.id});
        if (listTruyen) {
            objReturn.data= listTruyen;
            objReturn.status = 1;
            objReturn.msg = 'lấy ds thành công';
        } else {
            objReturn.status = 0;
            objReturn.msg = 'không có  dữ liệu'
        }
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }


    res.json(objReturn.data);

}

exports.addTruyen = async (req, res, next) => {
    try {
        const truyen = new md.truyenModel(req.body);
        truyen.tentruyen = req.body.tentruyen;
        truyen.mota = req.body.mota;
        truyen.tacgia = req.body.tacgia;
        truyen.namxuatban = req.body.namxuatban;
        truyen.anhbia = req.body.anhbia;
        truyen.anhnoidung = req.body.anhnoidung;
        truyen.anhchitiet = req.body.anhchitiet;

        let new_u = await truyen.save()
        sock.io.emit("new tt", "Đã có thêm truyện mới. Mời bạn vào đọc truyện");
        return res.status(201).json({ truyen: new_u })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}


exports.updateTruyen = async (req, res, next) => {

    try {

        const truyen = await md.truyenModel.findById(req.params.id);

        truyen.tentruyen = req.body.tentruyen;
        truyen.mota = req.body.mota;
        truyen.tacgia = req.body.tacgia;
        truyen.namxuatban = req.body.namxuatban;
        truyen.anhbia = req.body.anhbia;
        truyen.anhnoidung = req.body.anhnoidung;
        truyen.anhchitiet = req.body.anhchitiet;
        
        const mtSave = await truyen.save();
        res.json(mtSave);
    } catch (error) {
        res.send(error)
        console.log(error);

    }

}
exports.deleteTruyen = async (req, res, next) => {
    try {
        await md.truyenModel.findByIdAndDelete(req.params.id, req.body);
        res.send('Xoa thanh cong')
    } catch (error) {
        res.send('Error')
    }

}

exports.listBinhLuan = async (req, res, next) => {

    let listBinhLuan = []



    try {
        listBinhLuan = await md.binhLuanModel.find({id_truyen: req.params.id_truyen}).populate("id_user");

        
        if (listBinhLuan) {
            objReturn1.data = listBinhLuan;
            objReturn1.status = 1;
            objReturn1.msg = 'lấy ds thành công';
        } else {
            objReturn1.status = 0;
            objReturn1.msg = 'không có  dữ liệu'
        }
    } catch (error) {
        objReturn1.status = 0;
        objReturn1.msg = error.msg;
    }

     res.json(objReturn1.data);
}

exports.addBinhLuan = async (req, res, next) => {

    try {
        var currentdate = new Date(); 
        var datetime = "" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

        const BL = new md.binhLuanModel(req.body);
        BL.binhluan = req.body.binhluan;
        BL.ngay = datetime;
        BL.id_truyen = req.body.id_truyen;
        BL.id_user = req.body.id_user;

        let new_u = await BL.save()
        sock.io.emit("new bl", "Vừa có thêm bình luận mới ");
        return res.status(201).json( {new_u})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}

exports.updateBinhLuan = async (req, res, next) => {
    try {
        const BL = await md.binhLuanModel.findById(req.params.id);
        BL.binhluan = req.body.binhluan;
        BL.ngay = req.body.ngay;
        BL.id_truyen = req.body.id_truyen;
        BL.id_user = req.body.id_user;
        const mtSave = await BL.save();

        res.json(mtSave);
    } catch (error) {
        res.send(error)
        console.log(error);

    }

}
exports.deleteBinhLuan = async (req, res, next) => {
    try {
        await md.binhLuanModel.findByIdAndDelete(req.params.id, req.body);
        res.send('Xoa thanh cong')
    } catch (error) {
        res.send('Error')
    }

}