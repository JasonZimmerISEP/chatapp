import { Friend } from '../interface/Friend';
export interface FriendResponse {
    success: boolean;
    errorMessage: string;
    reason: string;
    friends: Friend[];
}