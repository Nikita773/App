import { EditTaskModel } from './model';
import { EditTaskView } from './view';

class EditTaskController {
    constructor() {
        this.model = new EditTaskModel();
        this.view = new EditTaskView();

        this.view.subscribe('Edit data', this.model.updateData.bind(this.model));
        this.view.subscribe('Update data', this.model.updateData.bind(this.model));
        this.view.subscribe('Delete data', this.model.deleteData.bind(this.model));
    }
}

export default new EditTaskController();