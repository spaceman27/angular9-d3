import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../../models/ui.model';

@Injectable()
export class ApiService {
    public static readonly BASE_PATH = 'api/Server';

    constructor(private http: HttpClient) {
    }

    private combineUrl(target: string): string {
        return ApiService.BASE_PATH + '/' + target;
    }

    public accountLogin(userInfo: any) {
        this.http.post(this.combineUrl('Account/Login'), userInfo);
    }

    public personsAll(): Observable<Person[]> {
        return this.http.get<Person[]>(this.combineUrl('Persons/All'));
    }

    public personsAdd(person: Person): Observable<Person> {
       return this.http.post<Person>(this.combineUrl('Persons/Add'), person);
    }

    public personsGet(id: number): Observable<Person> {
       return this.http.post<Person>(this.combineUrl('Persons/Get'), id);
    }
}