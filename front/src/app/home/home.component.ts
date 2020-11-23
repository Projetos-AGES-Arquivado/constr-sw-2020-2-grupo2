import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Student } from '@/_models';
import { StudentService } from '@/_services';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    students: Student[] = [];

    constructor(
        private studentService: StudentService,
        private router: Router
        ) {}

    ngOnInit() {
        this.loadAllStudents();
    }

    editStudent(student) {
        this.router.navigate(['/register'], { queryParams: { student: JSON.stringify(student) } });
    }

    deleteStudent(id: number) {
        this.studentService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllStudents()
        });
    }

    private loadAllStudents() {
        this.studentService.getAll().pipe(first()).subscribe(students => {
            this.students = students;
        });
    }
}