const { removeTaskController } = require("./removeTask-controller");

export function showRemoveTaskPopup(tasks) {
    new removeTaskController(tasks);
}