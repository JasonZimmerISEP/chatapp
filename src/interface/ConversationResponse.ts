import { Conversation } from '../interface/Conversation';
export interface ConversationResponse {
    success: boolean;
    errorMessage: string;
    reason: string;
    messages: Conversation[];
}