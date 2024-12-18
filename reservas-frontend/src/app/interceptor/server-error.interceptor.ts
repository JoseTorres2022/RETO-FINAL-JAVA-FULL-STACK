import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, EMPTY, Observable, retry, tap } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ServerErrorsInterceptor implements HttpInterceptor{

    constructor(private snackBar: MatSnackBar){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Intercepta la solicitud HTTP y la pasa al siguiente manejador
        return next.handle(req).pipe(
            // Reintenta la solicitud según el número de reintentos definido en el entorno
            retry(environment.RETRY),
            // Utiliza el operador tap para inspeccionar los eventos HTTP
            tap(event => {
                // Verifica si el evento es una respuesta HTTP
                if (event instanceof HttpResponse) {
                    // Si la respuesta contiene un error en el cuerpo, lanza una excepción
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        throw new Error(event.body.errorMessage);
                    }
                    // Comentado: Muestra un mensaje de éxito (puede ser descomentado si se desea)
                    // else {
                    //     this.snackBar.open('SUCCESS', 'INFO', { duration: 2000 });
                    // }
                }
            }),
            // Maneja los errores que ocurren durante la solicitud HTTP
            catchError((err) => {
                console.log("Error: ", err);
                // Maneja el error 400 (Bad Request)
                if (err.status === 400) {
                    this.snackBar.open(err.error.message, 'ERROR 400', { duration: 5000 });
                }
                // Maneja el error 404 (Not Found)
                else if (err.status === 404) {
                    this.snackBar.open('No existe el recurso', 'ERROR 404', { duration: 5000 });
                }
                // Maneja los errores 403 (Forbidden) y 401 (Unauthorized)
                else if (err.status === 403 || err.status === 401) {
                    this.snackBar.open(err.error.message, 'ERROR 403', { duration: 5000 });
                    // Comentado: Limpia la sesión y redirige al usuario a la página de inicio de sesión
                    // sessionStorage.clear();
                    // this.router.navigate(['/login']);
                }
                // Maneja el error 500 (Internal Server Error)
                else if (err.status === 500) {
                    this.snackBar.open(err.error.message, 'ERROR 500', { duration: 5000 });
                }
                // Maneja otros errores
                else {
                    this.snackBar.open(err.error.message, 'ERROR', { duration: 5000 });
                }

                // Retorna un observable vacío para finalizar el flujo
                return EMPTY;
            })
        );
    }
    
}