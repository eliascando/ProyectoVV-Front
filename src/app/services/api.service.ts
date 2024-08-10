import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Global } from "../global";
import { IApiResponse } from "../interfaces/IApiResponse";
import { catchError, Observable, of } from "rxjs";
import Swal from "sweetalert2";

@Injectable()

export class ApiService {
    private api_url: string;

    constructor(
        private http: HttpClient
    ){
        this.api_url = Global.api_url;
    }

    private getOptions() {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
    }

    public get(enpoint: string) : Observable<IApiResponse> {
        return this.http.get<IApiResponse>(
            this.api_url + enpoint, this.getOptions()
        ).pipe(
            catchError(this.handleError<IApiResponse>('get',{
                success: false,
                message: 'An error occurred',
                data: null,
                statusCode: 500
            }))
        );
    }

    public post(enpoint: string, data: any) : Observable<IApiResponse> {
        return this.http.post<IApiResponse>(
            this.api_url + enpoint, data, this.getOptions()
        ).pipe(
            catchError(this.handleError<IApiResponse>('post',{
                success: false,
                message: 'An error occurred',
                data: null,
                statusCode: 500
            }))
        );
    }

    public put(enpoint: string, data: any) : Observable<IApiResponse> {
        return this.http.put<IApiResponse>(
            this.api_url + enpoint, data, this.getOptions()
        ).pipe(
            catchError(this.handleError<IApiResponse>('put',{
                success: false,
                message: 'An error occurred',
                data: null,
                statusCode: 500
            }))
        );
    }

    public delete(enpoint: string) : Observable<IApiResponse> {
        return this.http.delete<IApiResponse>(
            this.api_url + enpoint, this.getOptions()
        ).pipe(
            catchError(this.handleError<IApiResponse>('delete',{
                success: false,
                message: 'An error occurred',
                data: null,
                statusCode: 500
            }))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} method failed: ${error.message}`);
            console.error(error.status);
            if (error.status == 403) {
                Swal.fire(
                    'Acceso denegado',
                    `
                    <p> No tienes permisos para realizar esta acción </p>
                    <span style="font-size: 12px;">
                        Por favor, 
                        <a href="/help">contacta con soporte</a>
                    </span>
                    `,
                    'error'
                ).then((result) => {
                    console.log(result);
                    console.log('Acceso denegado');
                });
            }
            if (error.status == 404)
            {
                Swal.fire(
                    'Error',
                    `
                    <p> No se encontró el recurso solicitado </p>
                    <span style="font-size: 12px;">
                        Por favor, 
                        <a href="/help">contacta con soporte</a>
                    </span>
                    `,
                    'error'
                ).then((result) => {
                    console.log(result);
                    console.log('Error');
                });
            }
            // if (error.status == 401) {
            //     Swal.fire(
            //         'Sesión expirada',
            //         `
            //         <p> Tu sesión ha expirado </p>
            //         <span style="font-size: 12px;">
            //             Por favor, 
            //             <a href="/login">inicia sesión</a>
            //         </span>
            //         `,
            //         'error'
            //     ).then(() => {
            //         localStorage.removeItem('token');
            //         localStorage.removeItem('user');
            //         window.location.reload();
            //     });
            // }
            return of(result as T);
        };
    }

}
