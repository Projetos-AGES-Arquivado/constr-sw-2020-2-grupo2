/*eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';

@Component({templateUrl: 'detail.component.html'})
export class DetailComponent implements OnInit {
    detailForm: FormGroup;
    student;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
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

        this.detailForm = this.formBuilder.group({
            name:           [this.student ? this.student.name           : '' , Validators.required],
            registration:   [this.student ? this.student.registration   : '' , Validators.required],
            email:          [this.student ? this.student.email          : '' , Validators.required],
            cpf:            [this.student ? this.student.cpf            : '' , Validators.required],
            rg:             [this.student ? this.student.rg             : '' , Validators.required],
            birthdate:      [this.student ? this.student.birthdate      : '' , Validators.required],
            phone1:         [this.student ? this.student.phones[0]      : '' , Validators.required],
            phone2:         [this.student ? this.student.phones[1]      : '']
        });

    }

    // convenience getter for easy access to form fields
    get f() { return this.detailForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.detailForm.invalid) {
            return;
        }

        this.loading = true;

        this.router.navigate(['/register'], { queryParams: { student: JSON.stringify(this.student) } });
        
    }

}
