export interface Conversation {
    sendingUserId: string;
    sendingDisplayName: string;
    receivingUserId: string;
    receivingDisplayName: string;
    message: string;
    messageSent: string;
}