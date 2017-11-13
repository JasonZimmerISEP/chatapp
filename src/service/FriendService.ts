import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Friend } from '../interface/Friend';
import { FriendResponse } from '../interface/FriendResponse';
import { Environment } from '../config/environment';

@Injectable()
export class FriendService {
    private env: Environment;
    private baseGetUrl: string = '';
    
    constructor(private http: Http) {
        this.baseGetUrl = this.env.baseUrl + 'api/Friends/';
    }

    getFriends(userId, version): Observable<FriendResponse> {
        let result$ = this.http
            .get(`${this.baseGetUrl}?UserId=` + userId + `&mobileVersion=` + version)
            .map(mapFriendResult)
            .catch(this.handleError)
        return result$;
    }

    handleError(error: any) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}

function mapFriendResult(response: Response): FriendResponse {
    return toResult(response.json());
}

function toResult(r: any): FriendResponse {
    console.log("Mapping Friends");
    let result = <FriendResponse>({
        errorMessage: r.ErrorMessage,
        success: r.Success,
        reason: r.Reason,
        friends: r.Result
    });
    console.log('Parsed response:', result);
    return result;
}
