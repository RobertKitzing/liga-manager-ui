import { Language } from '../selected-items.state';

export class SetSelectedLanguage {

    static readonly type = '[SelectedItemsState] SetSelectedLanguage';

    constructor(
        public payload: Language,
    ) { }

}
