/*eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, StudentService } from '@/_services';
import { Student } from '@/_models';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    student;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private studentService: StudentService,
        private alertService: AlertService,
        private route: ActivatedRoute
    ) { 
    }

    ngOnInit() {
        this.route
        .queryParams
        .subscribe(params => {
            // Defaults to 0 if no query param provided.
            this.student = JSON.parse(params.student);
        });


        //if(this.student) {
            //student = this.studentService.getById(this.studentId).pipe(first()).pipe(student => {
            //    this.updateForm(student)
            //  });

        //} 

        this.registerForm = this.formBuilder.group({
            name:           [this.student ? this.student.name           : '' , Validators.required],
            registration:   [this.student ? this.student.registration   : '' , Validators.required],
            email:          [this.student ? this.student.email          : '' , Validators.required],
            cpf:            [this.student ? this.student.cpf            : '' , Validators.required],
            rg:             [this.student ? this.student.rg             : '' , Validators.required],
            phones:         [this.student ? this.student.phones         : [] , Validators.required]
        });

    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        if(this.student) {
            this.update();
        } else {
            this.register();
        }
        
    }

    register() {

        let createdStudent = {
            name: this.registerForm.value.name,
            email: this.registerForm.value.email,
            phones: [this.registerForm.value.phones],
            cpf: this.registerForm.value.cpf,
            rg: this.registerForm.value.rg,
            birthdate: "2020-01-01",
            registration: this.registerForm.value.registration
        }

        this.studentService.register(createdStudent)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Aluno registrado com sucesso!', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    update() {

        let updatedStudent = {
            name: this.registerForm.value.name,
            email: this.registerForm.value.email,
            phones: [this.registerForm.value.phones],
            cpf: this.registerForm.value.cpf,
            rg: this.registerForm.value.rg,
            birthdate: this.student.birthdate,
            registration: this.registerForm.value.registration
        }

        this.studentService.update(this.student._id, updatedStudent)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Aluno atualizado com sucesso!', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
