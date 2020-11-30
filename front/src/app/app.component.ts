import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import '../../node_modules/datatables.net-dt/css/jquery.dataTables.css'

//import '../../node_modules/datatables.net/js/jquery.dataTables.js'
//import '../../node_modules/jquery/dist/jquery.js'

@Component({ 
    selector: 'app', 
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'app.component.html', 
    styleUrls: ['../../node_modules/datatables.net-dt/css/jquery.dataTables.css']
})
export class AppComponent {

    constructor(private router: Router) {}
}