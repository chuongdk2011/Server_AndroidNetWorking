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
exports.login = async (req, res, next) => {
    try {

        if (req.body.username && req.body.passwd) {
            let user = await md.userModel.findOne(req.body).select("-passwd");
            if (!user) {
                return res.status(401)
                    .json({ error: 'Sai thông tin đăng nhập' })
            }
            console.log(user);
            res.send({ user })
        }

      
       
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}

exports.listUser = async (req, res, next) => {

    let listUser = []

    let dieu_kien_loc = null;

    if (typeof (req.query.name) != 'undefined') {
        dieu_kien_loc = { name: new RegExp('.*'+req.query.name+'.*') };
    }

    if (typeof (req.query.username) != 'undefined') {
        dieu_kien_loc = { username: req.query.username};
    }
    
    

    try {
        
        listUser = await md.userModel.find(dieu_kien_loc);

        if (listUser) {
            objReturn.data = listUser;
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


exports.reg = async (req, res, next) => {

    try {
        const user = new md.userModel(req.body);
        user.username = req.body.username;
        user.passwd = req.body.passwd;
        user.email = req.body.email;
        user.fullname = req.body.fullname;

        let new_u = await user.save()
        sock.io.emit("new msg", "Đăng Ký Tài Khoản Thành Công");

        return res.status(201).json( new_u )

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
    // res.json( {status: 1, msg: 'Trang đăng ký'});
}

exports.updatePass =async (req,res,next)=> {
    try {
        const user = await md.userModel.findById(req.params.id);

        user.passwd = req.body.passwd;

        const mtSave = await user.save();

        res.json(mtSave);

    } catch (error) {
        res.send(error)
        console.log(error);
        
    }

}
exports.delete =async (req,res,next)=> {

    try {
        await md.userModel.findByIdAndDelete(req.params.id, req.body);
        res.send('Xoa thanh cong')
    } catch (error) {
        res.send('Error')
    }

}

exports.listYeuThichByUser = async (req, res, next) => {

    let listUser = []
    

    try {
        
        listUser = await md.yeuThichModel.find({id_user: req.params.id});

        if (listUser) {
            objReturn.data = listUser;
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

exports.addYT = async (req, res, next) => {
    try {
        const yt = new md.yeuThichModel(req.body);
        yt.id_user = req.body.id_user;
        yt.tentruyen = req.body.tentruyen;
        yt.mota = req.body.mota;
        yt.tacgia = req.body.tacgia;
        yt.namxuatban = req.body.namxuatban;
        yt.anhbia = req.body.anhbia;
        yt.anhnoidung = req.body.anhnoidung;
        yt.anhchitiet = req.body.anhchitiet;

        let new_u = await yt.save()
        return res.status(201).json( {YT: new_u} )

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}

exports.delYT =async (req,res,next)=> {

    try {
        await md.yeuThichModel.findByIdAndDelete(req.params.id,req.body);
        res.send('Xoa thanh cong')
    } catch (error) {
        res.send('Error')
    }

}

exports.listYeuThich = async (req, res, next) => {

    let listUser = []
    

    try {
        
        listUser = await md.yeuThichModel.find();

        if (listUser) {
            objReturn.data = listUser;
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