import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { TokenResponse } from '../interface/TokenResponse';
import { Environment } from '../config/environment';

@Injectable()
export class LoginService {
    private env: Environment = new Environment();
    private basePostUrl: string = '';
    
    constructor(private http: Http) {
        this.basePostUrl = this.env.baseUrl + 'api/Login/';
    }

    postLogin(loginObj): Observable<TokenResponse> {
        let result$ = this.http
            .post(`${this.basePostUrl}`, loginObj)
            .map(mapLoginResult)
            .catch(this.handleError)
        return result$;
    }

    handleError(error: any) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}

function mapLoginResult(response: Response): TokenResponse {
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
