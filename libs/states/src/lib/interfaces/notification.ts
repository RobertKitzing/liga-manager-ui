export interface INotification {

    notification?: {
        message: string,
        translateParams?: { title?: unknown, message?: unknown }
    };

}
