module.exports = app => {
    const controller = require("../itens/controller/controllerRoom")();

    app.route("/api/rooms").get(controller.listRooms);
}