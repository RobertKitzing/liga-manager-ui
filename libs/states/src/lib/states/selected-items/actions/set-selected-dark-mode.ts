import { DarkModeAppearance } from '@aparajita/capacitor-dark-mode';

export class SetSelectedDarkMode {

    static readonly type = '[SelectedItemsState] SetSelectedDarkMode';

    constructor(
        public darkMode?: DarkModeAppearance | null,
    ) { }

}
