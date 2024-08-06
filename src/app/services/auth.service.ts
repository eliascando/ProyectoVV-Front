import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Global } from "../global";
import { IApiResponse } from "../interfaces/IApiResponse";
import { catchError, Observable, of, tap } from "rxjs";
import { ILogin } from "../interfaces/ILogin";
import { Router } from "@angular/router";
import { IUserData } from "../interfaces/IUserData";

@Injectable()
export class AuthService {
    private api_url: string;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.api_url = Global.api_url;
    }

    public login(login: ILogin): Observable<IApiResponse> {
        return this.http.post<IApiResponse>(
            this.api_url + 'login', login
        ).pipe(
            tap((response: IApiResponse) => {
                if (response.success) {
                    // Guarda los datos de sesión en localStorage
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
            }),
            catchError(this.handleError<IApiResponse>('post', {
                success: false,
                message: 'Error al iniciar sesión',
                data: null,
                statusCode: 500
            }))
        );
    }

    public logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
        window.location.reload();
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    public getUser(): IUserData {
        const userJson = localStorage.getItem('user');
        if (userJson == null || userJson === undefined){
            throw new Error('Error al obtener usuario')
        }
        return JSON.parse(userJson) as IUserData;
    }

    public getToken(): string {
        return localStorage.getItem('token') || '';
    }
}
