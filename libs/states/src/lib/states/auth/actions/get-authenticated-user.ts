export class GetAuthenticatedUser {

    static readonly type = '[Auth] GetAuthenticatedUser';

    constructor(public forceRefresh?: boolean) {}

}
