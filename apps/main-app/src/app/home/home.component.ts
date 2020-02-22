import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InMemoryWebApiService, Person, ApiService } from '@secureworks-homeassignment/shared/core';
@Component({
  selector: 'secureworks-homeassignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  frm: FormGroup;
  lst: Person[];
  constructor(
    private fb: FormBuilder, 
    private inmemoryService: InMemoryWebApiService,
    private apiService: ApiService
    ) {
    this.frm = this.fb.group({
      name: [''],
      age: [''],
      weight: ['']
    });
    apiService.personsAll().subscribe(r => {
      console.log("all persons", r);
      this.lst = r;
    });
  }

  ngOnInit() {
  }

  add(){
    const row = this.frm.getRawValue();
    const person = new Person();
    person.name = row.name;
    person.age = row.age;
    person.weight = row.weight;    
    this.apiService.personsAdd(row).subscribe(r => {
      console.log("add: ", r);
    });
  }
}
