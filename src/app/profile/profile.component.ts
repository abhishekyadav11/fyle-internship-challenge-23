import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faGripVertical, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  faGripVertical = faGripVertical;
  
  repositories:any[] = [];
  repositories2:any[] = [];

  pageSize:number = 10;
  pageSizeOptions: number[] = [5, 10, 20,100];

  @ViewChild('paginator') paginator!:MatPaginator;

  constructor(private route:ActivatedRoute,
              private apiService: ApiService,
              private frmBuilder:FormBuilder,
              public toast:NgToastService)
  {

  }

  Profile = this.frmBuilder.group(
    {
      username: ['',Validators.required]
    }
  )

  ngOnInit()
  {

  }

  getRepositories()
  {
    const username = this.Profile.get('username')?.value;

    if (username !== undefined && username !== null){
      this.apiService.getRepositories(username).subscribe((res)=>{
        this.repositories = res;
        console.log(this.repositories); 
        this.repositories2 = this.repositories.slice(0,this.pageSize);    
      },error=>{    
        this.toast.error({detail:'Error',summary:'User not found',duration:5000});    
    });
    } 
  }

  onPageChange(event:any)
  {
     const startIndex = event.pageIndex * event.pageSize;
     
     const endIndex = startIndex + event.pageSize;
     
     this.repositories2 = this.repositories.slice(startIndex, endIndex);
     
  }
  
}
