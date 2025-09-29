import { SelectedContextTypes } from '../selected-items.state';

export class SetSelectedBase {

    constructor(
        public context: SelectedContextTypes,
        public id?: string | null,
    ) {

    }

}