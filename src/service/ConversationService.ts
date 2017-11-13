import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Friend } from '../interface/Friend';
import { MessageRequest } from '../interface/MessageRequest';
import { ApiResponse } from '../interface/ApiResponse';
import { ConversationResponse } from '../interface/ConversationResponse';
import { FriendResponse } from '../interface/FriendResponse';
import { Environment } from '../config/environment';

@Injectable()
export class ConversationService {
    private env: Environment;
    private baseUrl: string = '';
    
    constructor(private http: Http) {
        this.baseUrl = this.env.baseUrl + 'api/Conversation/';
    }

    getConversation(fromUserId: string, toUserId: string): Observable<FriendResponse> {
        let result$ = this.http
            .get(`${this.baseUrl}?fromUserId=` + fromUserId + `&toUserId=` + toUserId)
            .map(mapConversationResult)
            .catch(this.handleError)
        return result$;
    }
    
    sendMessage(messageObj: MessageRequest): Observable<ApiResponse> {
        let result$ = this.http
            .post(`${this.baseUrl}`, messageObj)
            .map(mapConversationResult)
            .catch(this.handleError)
        return result$;
    }

    handleError(error: any) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}

function mapConversationResult(response: Response): ConversationResponse {
    return toResult(response.json());
}

function toResult(r: any): ConversationResponse {
    console.log("Mapping Conversation");
    let result = <ConversationResponse>({
        errorMessage: r.ErrorMessage,
        success: r.Success,
        reason: r.Reason,
        messages: r.Messages
    });
    console.log('Parsed response:', result);
    return result;
}
