export class SetSelectedTheme {

    static readonly type = '[SelectedItemsState] SetSelectedTheme';

    constructor(
        public theme: string,
    ) { }

}
