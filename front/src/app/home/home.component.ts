import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Student } from '@/_models';
import { StudentService } from '@/_services';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    students: Student[] = [];
    dtTrigger: Subject<any> = new Subject<any>();
    dtOptions: DataTables.Settings = {};

    constructor(
        private studentService: StudentService,
        private router: Router
        ) {}

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2,
            language: {
                lengthMenu: "Linhas por página: _MENU_",
                info: "_START_ - _END_ de _TOTAL_",
                paginate: {
                    first:      "<<",
                    last:       ">>",
                    next:       ">",
                    previous:   "<"
                }
            }
        };

        this.loadAllStudents();
    }

    editStudent(student) {
        this.router.navigate(['/register'], { queryParams: { student: JSON.stringify(student) } });
    }

    studentDetail(student) {
        this.router.navigate(['/detail'], { queryParams: { student: JSON.stringify(student) } });
    }

    deleteStudent(id: number) {
        var r = confirm("Deseja realmente deletar o Aluno?");
        if (r == true) {
            this.studentService.delete(id).pipe(first()).subscribe(() => {
                this.loadAllStudents()
            });
        } else {
            console.log("Aluno não deletado");
        }
        
    }

    searchStudentsByParam(searchValue: string) {
        if(searchValue != "") {
            this.loadStudentsByParam(searchValue);
        } else {
            this.loadAllStudents();
        }
    }

    private loadStudentsByParam(searchValue: string) {
        this.studentService.getByParams("name",searchValue).pipe(first()).subscribe(students => {
            this.students = students;
        });
    }

    private loadAllStudents() {
        this.studentService.getAll().pipe(first()).subscribe(students => {
            this.students = students;
            this.dtTrigger.next();
        });
    }
}