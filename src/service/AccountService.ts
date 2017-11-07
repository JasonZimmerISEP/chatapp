import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { TokenResponse } from '../interface/TokenResponse';

@Injectable()
export class AccountService {
    private baseCreateUrl: string = 'http://localhost:30873/api/Account/Post';
    
    constructor(private http: Http) {
    }
    
    createAccount(accountObj): Observable<TokenResponse> {
        let result$ = this.http
            .post(`${this.baseCreateUrl}`, accountObj)
            .map(mapCreateResult)
            .catch(this.handleError)
        return result$;
    }

    handleError(error: any) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}

function mapCreateResult(response: Response): TokenResponse {
    return toResult(response.json());
}

function toResult(r: any): TokenResponse {
    console.log("Mapping Login");
    let result = <TokenResponse>({
        errorMessage: r.ErrorMessage,
        success: r.Success,
        token: r.token,
        userId: r.userId,
        reason: r.Reason
    });
    console.log('Parsed response:', result);
    return result;
}
