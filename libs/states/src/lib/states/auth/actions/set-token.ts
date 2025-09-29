export class SetToken {

    static readonly type = '[Auth] SetToken';

    constructor(
        public token?: string | null,
    ) {}

}
