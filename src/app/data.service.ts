import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  homes$=new BehaviorSubject<any[]>([]);
  constructor(private httpClient:HttpClient) {} 

    loadHomes(homeTypeFilters:any,searchString:any){
      this.homes$.next([]) 
      this.httpClient.get<any[]>('assets/homes.json').pipe(delay(2000),
       
       //  filter homes on client side
       map((homes: any[])=>{
        if(!homeTypeFilters.length){
          return homes
        }
        return homes.filter(home=>homeTypeFilters.includes(home.type))
       })

      //  search home on client side 
       ,map((homes: any[])=>{
        if(!searchString){
          return homes
        }
        return homes.filter(home=>home.title.toLowerCase().includes(searchString.toLowerCase()))
       })
       )
     
       .subscribe(homes=>{
        this.homes$.next(homes)
        })
    }
  
}


