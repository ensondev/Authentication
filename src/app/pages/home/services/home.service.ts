import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { map } from "rxjs/operators";

interface User {
    id_usuario: number;
    nombre_usuario: string;
    rol_usuario: string;
}

interface UsersResponse {
    p_status: boolean;
    p_message?: string;
    p_data: {
        users: User[];
        totalUsers?: number;
    };
}

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    private _http = inject(HttpClient);

    getUsers(page: number = 1, limit: number = 10): Observable<{users: User[], totalUsers: number}> {
        return this._http.get<UsersResponse>(
            `${environment.API_URL}/users?page=${page}&limit=${limit}`
        ).pipe(
            map(response => ({
                users: response.p_data.users,
                totalUsers: response.p_data.totalUsers || 0
            }))
        );
    }

    deleteUser(userId: number): Observable<any> {
        return this._http.delete(`${environment.API_URL}/auth/users/${userId}`);
    }
}