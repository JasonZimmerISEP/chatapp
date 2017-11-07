export interface TokenResponse {
    success: boolean;
    token: string;
    userId: string;
    errorMessage: string;
    reason: string;
}