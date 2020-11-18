import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from '@/_models';

@Injectable({ providedIn: 'root' })
export class StudentService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Student[]>(`${config.apiUrl}/students`);
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/students/${id}`);
    }

    register(student: Student) {
        return this.http.post(`${config.apiUrl}/students/register`, student);
    }

    update(student: Student) {
        return this.http.put(`${config.apiUrl}/students/${student.id}`, student);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/students/${id}`);
    }
}