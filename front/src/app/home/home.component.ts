import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Student } from '@/_models';
import { StudentService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    //currentUser: User;
    //currentUserSubscription: Subscription;
    //users: User[] = [];
    students: Student[] = [];

    constructor(
        //private authenticationService: AuthenticationService,
        //private userService: UserService,
        private studentService: StudentService
    ) {
        //this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        //    this.currentUser = user;
        //});
    }

    ngOnInit() {
        this.loadAllStudents();
    }

    //ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        //this.currentUserSubscription.unsubscribe();
    //}

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