/*eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, StudentService } from '@/_services';
import { DatePipe } from '@angular/common';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    student;
    loading = false;
    submitted = false;
    phones: string[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private studentService: StudentService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private datePipe: DatePipe
    ) { 
    }

    ngOnInit() {

        var yyyyMMdd = this.datePipe.transform(new Date(),"yyyy-MM-dd");

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
            birthdate:      [this.student ? this.student.birthdate      : '' , Validators.required],
        });

        this.phones = this.student.phones;

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

    addPhone() {
        this.phones.push(null);
    }

    updatePhone(updatedValue, originalPhone) {
        let itemIndex = this.phones.findIndex(item => item == originalPhone);
        this.phones[itemIndex] = updatedValue;
    }

    deletePhone(phone) {
        var r = confirm("Deseja realmente deletar o Aluno?");
        if (r == true) {
            this.phones.forEach( (item, index) => {
                if(item === phone) this.phones.splice(index,1);
            });
        } else {
            console.log("Telefone não deletado");
        }
    }

    register() {

        let createdStudent = {
            name: this.registerForm.value.name,
            email: this.registerForm.value.email,
            phones: this.phones.filter(x => x != null) as string[],
            cpf: this.registerForm.value.cpf,
            rg: this.registerForm.value.rg,
            birthdate: this.datePipe.transform(this.registerForm.value.birthdate, "yyyy-MM-dd"),
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
            phones: this.phones.filter(x => x != null) as string[],
            cpf: this.registerForm.value.cpf,
            rg: this.registerForm.value.rg,
            birthdate: this.datePipe.transform(this.registerForm.value.birthdate, "yyyy-MM-dd"),
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
