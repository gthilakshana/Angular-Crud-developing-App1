import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PostService} from "../../services/post.service";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  list:Array<any>=[];


  constructor(private postService:PostService,
              private _snackBar: SnackBarService) {
  }

  ngOnInit():void {
    this.postService.findAll()
      .subscribe(response=>{
        console.log(response);
        this.list=response;
        console.log(this.list);

      });
  }

  delete(id:any) {
   if (confirm('are you sure '+id)){
  this.postService.delete(id)
    .subscribe(response=>{
      console.log();
    if (response){
      this._snackBar.trigger('Deleted','close');

      for (let i=0;i<this.list.length;i++){
        if(this.list[i].id==id){
          this.list.splice(i,1);
          return;
        }
      }
    }

    });
   }
  }
}
