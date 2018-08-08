export enum WebSocketMessageTypes {
    MATCH_UPDATED = 'MATCH_UPDATED'
}

export interface WebSocketMessage {
    type: string;
    data: any;
}