export enum WebSocketMessageTypes {
    MATCH_UPDATED = 'MATCH_UPDATED',
    PITCH_ADDED = 'PITCH_ADDED'
}

export interface WebSocketMessage {
    type: string;
    data: any;
}
