/*eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Student } from '@/_models';

@Injectable({ providedIn: 'root' })
export class StudentService {
    constructor(private http: HttpClient) { }

    //OLD
    //http://ec2-3-236-239-112.compute-1.amazonaws.com:3000/api/alunos
    //NEW
    //http://ec2-34-228-52-17.compute-1.amazonaws.com:3000/api/alunos

    getAll() {
        //return this.http.get<Student[]>(`${config.apiUrl}/alunos`);      
        return this.http.get<any[]>(`${config.apiUrl}/alunos`);
    }

    getByParams(key, value) {
        let params = new HttpParams().set(key, value);
        return this.http.get<any[]>(`${config.apiUrl}/alunos`, { params: params });
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/alunos/${id}`);
    }

    register(student) {
        return this.http.post(`${config.apiUrl}/alunos`, student);
    }

    update(id, student) {
        return this.http.put(`${config.apiUrl}/alunos/${id}`, student);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/alunos/${id}`);
    }
}