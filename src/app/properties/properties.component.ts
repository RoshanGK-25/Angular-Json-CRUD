import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PropertyService } from '../Shared/property.service';
import { property } from './property.model';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  showModal = false;
  allProperty: any;
  formValue !: FormGroup;
  propertyModalObj: property = new property();
  showAdd!: boolean;
  showEdit!: boolean;

  constructor(private fb: FormBuilder, private api: PropertyService) { }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      ptitle: [''],
      price: [''],
      plocation: [''],
      pdetails: ['']
    });
    this.getAllProperty();
  }
  getAllProperty() {
    // this.api.getAllProp().subscribe((res) => {
    //   this.allProperty = res;
    //   console.warn(this.allProperty);
    // });
    this.api.getAllProp().subscribe((res) => {
      this.allProperty = res;
      console.warn(this.allProperty);
    })
  }

  clickAddProperty() {
    this.formValue.reset();
    this.showAdd = true;
    this.showEdit = false;
    this.showModal = true;
  }


  addProperty() {
    this.propertyModalObj.ptitle = this.formValue.value.ptitle;
    this.propertyModalObj.price = this.formValue.value.price;
    this.propertyModalObj.plocation = this.formValue.value.plocation;
    this.propertyModalObj.pdetails = this.formValue.value.pdetails;
    this.api.addListing(this.propertyModalObj).subscribe((res) => {
      if (res === null) {
        console.log(res === null);
        this.getAllProperty();
        this.formValue.reset();
      }
      else {
        console.log(res)
        alert("Record added successfully! 👍");
        let refModal = document.getElementById('#clear');
        refModal?.click()
        this.showModal = false;
        this.getAllProperty();
        this.formValue.reset();
      }

    }, err => {
      alert("Something is wrong! 😢")
    })
  }

  deleteProperty(property: any) {
    this.api.deleteProp(property).subscribe((res) => {
      alert("Property deleted successfully 👍");
      this.getAllProperty();
    })
  }


}
