/*eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EvaluationService {
    constructor(private http: HttpClient) { }

    //NEW
    //http://ec2-52-67-129-68.sa-east-1.compute.amazonaws.com:8000/api/v1/avaliacoes

    getAll() {
        //return this.http.get<Student[]>(`${config.apiUrl}/alunos`);      
        return this.http.get<any[]>(`${config.evaluationApiUrl}/avaliacoes`);
    }

    getById(id: number) {
        return this.http.get(`${config.evaluationApiUrl}/avaliacoes/${id}`);
    }

}