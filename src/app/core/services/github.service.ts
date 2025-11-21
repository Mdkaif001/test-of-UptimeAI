import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { Repo } from '../models/repo.model';

@Injectable({
    providedIn: 'root'
})
export class GithubService {
    private baseUrl = 'https://api.github.com';

    constructor(private http: HttpClient) { }

    getUser(username: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/users/${username}`);
    }

    getRepos(username: string): Observable<Repo[]> {
        return this.http.get<Repo[]>(`${this.baseUrl}/users/${username}/repos?sort=updated&per_page=6`);
    }

    // Mock contribution data since the real API requires complex GraphQL/Auth
    getContributionData(): Observable<any> {
        // Generating a mock heatmap data similar to GitHub's
        const data = [];
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
            data.push([
                d.toISOString().split('T')[0],
                Math.floor(Math.random() * 10) // Random contribution count
            ]);
        }
        return of(data);
    }
}
