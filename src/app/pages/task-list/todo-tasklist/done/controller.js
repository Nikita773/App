import { DoneModel } from './model';
import { DoneView } from './view';
import DataBase from '../../../../helpers/db';

export class DoneController {
    constructor() {
        this.model = new DoneModel();
        this.view = new DoneView();
        this.db = DataBase;

        this.model.subscribe(this.view.renderDoneTodos.bind(this.view));

        /*DB SUBSCRIBERS*/
        this.db.subscribe('Data changed', this.model.getData.bind(this.model));
    }
}