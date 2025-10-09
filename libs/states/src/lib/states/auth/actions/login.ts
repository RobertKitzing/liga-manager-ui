import { LoginContext } from '@liga-manager-ui/common';

export class Login {

    static readonly type = '[Auth] Login';

    constructor(
        public loginContext: LoginContext,
    ) {}

}
