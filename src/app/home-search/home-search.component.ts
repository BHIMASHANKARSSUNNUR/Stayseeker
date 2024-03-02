import { Component, OnInit,Output,EventEmitter,Input} from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css']
})
export class HomeSearchComponent implements OnInit{
  
  @Input() defaultSearch;
  @Output() applied=new EventEmitter();
  form!: FormGroup;
  constructor(private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      search:[this.defaultSearch]
    })

    this.form.get('search')?.valueChanges.subscribe(value=>{
      this.applied.emit(value)
    });
   
  }
}
