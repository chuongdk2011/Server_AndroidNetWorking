// Cài đặt socket .io bằng lệnh: npm i socket.io
const io = require("socket.io")();
const socketapi = {
    io: io
};
//==== Viết code tương tác ở trước dòng export


io.on("connection", (client) => {
    console.log("Client connected : " + client.id);
    // định nghĩa 1 sự kiện
    client.on('new msg', (data) => {
        // nhận dữ liệu từ client gửi lên
        console.log("New msg: " + data);
        // gửi phản hồi
        client.emit('new msg', "Server da nhan roi nhe: " + data);
    });

    client.on('new bl', (data) => {
        // nhận dữ liệu từ client gửi lên
        console.log("New bl: " + data);
        // gửi phản hồi
        client.emit('new bl', "Server da nhan roi nhe: " + data);
    });

    client.on('new tt', (data) => {
        // nhận dữ liệu từ client gửi lên
        console.log("New tt: " + data);
        // gửi phản hồi
        client.emit('new tt', "Server da nhan roi nhe: " + data);
    });


    // sự kiện ngắt kết nối


    client.on('disconnect', () => {
        console.log("Client disconected!");
    })

    

});


module.exports = socketapi;