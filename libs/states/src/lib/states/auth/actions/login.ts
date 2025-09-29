export interface LoginContext {
    username?: string;
    password?: string;
}

export class Login {

    static readonly type = '[Auth] Login';

    constructor(
        public loginContext: LoginContext,
    ) {}

}
