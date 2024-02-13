import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getRepositories(username: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`https://api.github.com/users/${username}/repos`);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
  getRepos(githubReposLink: any)
  {
    return this.httpClient.get(githubReposLink);
  }

  
}
