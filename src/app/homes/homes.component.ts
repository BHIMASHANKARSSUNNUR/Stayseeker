import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {
  
  homes$=this.dataService.homes$;
  homeTypeDropdownOpen: boolean=false;
  currentHomeTypeFilters=[];
  currentSearch='';
  constructor(private dataService:DataService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      const homeTypeFilters=params['home-type'] || [];
      const searchString=params['search'] || '';
      this.dataService.loadHomes(homeTypeFilters,searchString);
      this.currentHomeTypeFilters=homeTypeFilters;
      this.currentSearch=searchString;
    })
  }
  homeTypeFilterApplied($event:any){
    this.homeTypeDropdownOpen=false;
    const params=this.route.snapshot.queryParams;
    const hometype={'home-type':$event}
    this.router.navigate(['homes'],{queryParams:{...params,...hometype}})
  }

  searchApplied($event:any){
    const params=this.route.snapshot.queryParams;
    const search={search:$event}
    this.router.navigate(['homes'],{queryParams:{...params,...search}})
  }
}
