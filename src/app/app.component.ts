import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    
  }

  
}
