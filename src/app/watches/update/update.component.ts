import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WatchesService } from 'src/app/shared/services/watch.service';
import { Watch } from 'src/app/shared/interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  form: FormGroup;
  id: number;
  watch: Watch;
  constructor(private watchService: WatchesService,
    private route: ActivatedRoute,
    private router: Router) {

  }



  ngOnInit() {

    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      img: new FormControl(null, Validators.required),
    })

    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
      })

    this.watchService.getById(this.id)
      .subscribe((watch: Watch) => {
        this.watch = watch;
        
        this.form.patchValue({
          title: watch.title,
          model: watch.model,
          price: watch.price,
          img: watch.img
        })
      })

  }

  onSubmit() {

    const watch = {
      email: this.watch.email,
      like: this.watch.like,
      comments: this.watch.comments,
      title: this.form.value.title,
      model: this.form.value.model,
      price: this.form.value.price,
      img: this.form.value.img,
    }
    this.form.value
    console.log(this.form.value);

    this.watchService.update(this.id, watch)
    .subscribe(()=>{
      window.setTimeout(()=> {
        this.router.navigate(['/watches'])
      }, 1000)
    })
  }

  delete(id: number) {
    this.watchService.clear(id)
    .subscribe(()=> {
      MaterialService.toast('Deleted')
      window.setTimeout(()=> {
        this.router.navigate(['/watches'])
      }, 1000)
    })
  }

}
