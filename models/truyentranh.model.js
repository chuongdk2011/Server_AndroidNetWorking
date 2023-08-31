var db = require('./db');

const truyenSChema = new db.mongoose.Schema(
    {
        // định nghĩa cấu trúc của đối tượng sản phẩm
        tentruyen: {type: String, required: true},
        mota: {type: String, required: true},
        tacgia: {type: String, required: true},
        namxuatban: {type: String, require: true},
        anhbia: {type: String, require: true},
        anhnoidung: {type: Array, require: true},
        anhchitiet: {type: String, require: true}
        
    },
    {
        collection: 'truyen'
    }
);

const userSchema = new db.mongoose.Schema(
    {
        username: {type: String, required: true},
        passwd: {type: String, required: true},
        email: {type: String, required: true},
        fullname: {type: String, require: true},

    },
    {
        collection: 'Users'
    }
);
//nếu dịnh nghĩa về thẻ loại thì có thể viết tiếp ở dưới, không cần tạo mới file

const binhLuanSchema = new db.mongoose.Schema(
    {
        binhluan: {type: String, requied:true},
        ngay: {type: String, requied:true},
        id_truyen: {type: db.mongoose.Schema.Types.ObjectId,ref: 'truyenModel'},
        id_user: {type: db.mongoose.Schema.Types.ObjectId,ref: 'userModel'},
    },
    {
        collection: 'binhLuan'
    }

);

const yeuThichSchema = new db.mongoose.Schema(
    {
        tentruyen: {type: String, required: true},
        mota: {type: String, required: true},
        tacgia: {type: String, required: true},
        namxuatban: {type: String, require: true},
        anhbia: {type: String, require: true},
        anhnoidung: {type: Array, require: true},
        anhchitiet: {type: String, require: true},
        id_truyen: {type: db.mongoose.Schema.Types.ObjectId,ref: 'truyenModel'},
        id_user: {type: db.mongoose.Schema.Types.ObjectId,ref: 'userModel'},
    },
    {
        collection: 'yeuThich'
    }

);




let truyenModel = db.mongoose.model('truyenModel',truyenSChema);

let userModel = db.mongoose.model('userModel',userSchema);

let binhLuanModel = db.mongoose.model('binhLuanModel', binhLuanSchema);

let yeuThichModel = db.mongoose.model('yeuThichModel',yeuThichSchema);


module.exports = {truyenModel,userModel,binhLuanModel,yeuThichModel};