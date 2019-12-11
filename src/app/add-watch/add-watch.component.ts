import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WatchesService } from '../shared/services/watch.service';
import { Watch } from '../shared/interface';

@Component({
  selector: 'app-add-watch',
  templateUrl: './add-watch.component.html',
  styleUrls: ['./add-watch.component.css']
})
export class AddWatchComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private watchService: WatchesService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      img: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    const user = JSON.parse(window.localStorage.getItem('user'))[0];
    const watch: Watch = {
      like: [],
      comments: [],
      email: user.email,
      title: this.form.value.title,
      model: this.form.value.model,
      price: this.form.value.price,
      img: this.form.value.img ? this.form.value.img : ''
    }
    this.watchService.creat(watch)
    .subscribe((watch: Watch) => {
      console.log(watch);
    })
    this.form.reset();
    window.setTimeout(()=> {
      this.router.navigate(['/watches'])
    }, 2000)
    
  }

}
