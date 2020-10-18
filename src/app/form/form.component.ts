import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Validators } from '@angular/forms';
import { Feed } from '../feed';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {


  constructor(private dataService: DataService){}

  ngOnInit(){
    this.getData();
  }

  getData(): void{
    this.dataService.getData()
      .subscribe(feed => this.feedbackForm.setValue({
          name: feed.name,
          email: feed.email,
          feedback: feed.feedback,
          comment: feed.comment}));
  }

  feedbackForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    feedback: new FormControl('', Validators.required),
    comment: new FormControl(''),
  });
  
  onSubmit() {
    this.dataService.postData(this.feedbackForm.value as Feed)
    .subscribe(feed => window.alert("Submission Successful"))
  }
  
}
