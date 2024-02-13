import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  faGripVertical = faGripVertical;
  
  repositories:any[] = [];
  repositories2:any[] = [];

  pageSize:number = 10;
  pageSizeOptions: number[] = [5, 10, 20,100];

  @ViewChild('paginator') paginator!:MatPaginator;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private frmBuilder:FormBuilder,
    public toast:NgToastService
  ) {}

  Profile = this.frmBuilder.group(
    {
      username: ['',Validators.required]
    }
  )

  ngOnInit() {
    
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
