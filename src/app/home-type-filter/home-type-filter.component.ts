import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home-type-filter',
  templateUrl: './home-type-filter.component.html',
  styleUrls: ['./home-type-filter.component.css']
})
export class HomeTypeFilterComponent {

  form!: FormGroup;
    Apartment: any;
    Room: any;
    House: any;
  constructor(private formBuilder:FormBuilder){}

  @Input() defaultFilters:any=[];
  @Output() applied=new EventEmitter()
  ngOnInit(){
    console.log(this.defaultFilters)
    this.form=this.formBuilder.group({
      Apartment:[this.defaultFilters.includes('Apartment')],
      Room:[this.defaultFilters.includes('Room')],
      House:[this.defaultFilters.includes('House')]
    })
    
  }
    submit(formvalue:any){
      const homeTypes=Object.keys(formvalue).filter(item=>formvalue[item])
      console.log(homeTypes)
      this.applied.emit(homeTypes)
    }
}
