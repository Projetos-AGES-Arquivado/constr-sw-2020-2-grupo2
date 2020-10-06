

module.exports = () => {

    const roomRepository = require("../repository/roomRepository")
    const controller = {};

    controller.listRooms = (req,res) => res.status(200).json(roomRepository);

    return controller
}