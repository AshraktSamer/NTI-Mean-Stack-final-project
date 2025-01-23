import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
   storeName : string
   imgUrl : string
    constructor(
) {


        this.storeName ='NodeMart'
        this.imgUrl ='assets/homeicon.jpg'
  
    }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }

}
