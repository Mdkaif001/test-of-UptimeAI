import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { ContributionGraphComponent } from './components/contribution-graph/contribution-graph.component';
import { ActivityComponent } from './components/activity/activity.component';
import { GithubService } from '../../core/services/github.service';
import { User } from '../../core/models/user.model';
import { Repo } from '../../core/models/repo.model';
import { LucideAngularModule } from 'lucide-angular';
import { ProfileStateService } from './services/profile-state.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    RepoListComponent,
    ContributionGraphComponent,
    ActivityComponent,
    LucideAngularModule
  ],
  template: `
    <app-header></app-header>
    
    <div class="container mt-8">
      <div class="profile-layout">
        <aside class="profile-sidebar">
          <app-sidebar [user]="user"></app-sidebar>
        </aside>
        
        <main class="profile-content">
          <!-- Tabs moved to HeaderComponent -->

          <div *ngIf="(activeTab$ | async) === 'overview'">
            <app-repo-list [repos]="repos"></app-repo-list>
            <app-contribution-graph [data]="contributionData"></app-contribution-graph>
            <app-activity></app-activity>
          </div>

          <div *ngIf="(activeTab$ | async) !== 'overview'" class="empty-tab-content">
            <h3>{{ (activeTab$ | async) | titlecase }}</h3>
            <p>This tab has no content yet.</p>
          </div>
        </main>
      </div>
    </div>
    
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-links">
          <div class="footer-left">
            <lucide-icon name="github" [size]="24" class="github-logo"></lucide-icon>
            <span class="copyright">© 2025 GitHub, Inc.</span>
          </div>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Security</a>
            <a href="#">Status</a>
            <a href="#">Docs</a>
            <a href="#">Contact</a>
            <a href="#">Manage cookies</a>
            <a href="#">Do not share my personal infromation</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .profile-layout {
      display: flex;
      gap: 24px;
      align-items: flex-start;
      
      @media (max-width: 768px) {
        flex-direction: column;
        gap: 0;
      }
    }
    .profile-sidebar {
      width: 296px;
      flex-shrink: 0;
      z-index: 3;
      
      @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 24px;
      }
    }
    .profile-content {
      flex: 1;
      min-width: 0;
      margin-top: -35px;
    }
    .tabs-nav {
      display: flex;
      gap: 8px;
      border-bottom: 1px solid var(--gh-border);
      position: sticky;
      top: 64px;
      background: var(--gh-bg);
      z-index: 10;
      padding-bottom: 0;
      overflow-x: auto;
      scrollbar-width: none;
      
      &::-webkit-scrollbar { display: none; }
      
      .tab-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        color: var(--gh-text-primary);
        font-size: 14px;
        border-bottom: 2px solid transparent;
        white-space: nowrap;
        transition: border-bottom-color 0.2s;
        cursor: pointer;
        
        &:hover {
          background: var(--gh-btn-hover);
          border-radius: 6px 6px 0 0;
          text-decoration: none;
          color: var(--gh-text-primary);
        }
        
        &.active {
          font-weight: 600;
          border-bottom-color: #fd8c73;
          
          lucide-icon { color: var(--gh-text-primary); }
        }
        
        lucide-icon { color: var(--gh-text-secondary); }
        
        .counter {
          background: rgba(175, 184, 193, 0.2);
          border-radius: 2em;
          padding: 0 6px;
          font-size: 12px;
          font-weight: 500;
          color: var(--gh-text-primary);
        }
      }
    }
    .footer {
      margin-top: 60px;
      padding: 16px 0;
      
      .footer-content {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #57606a;
        gap: 20px;

        
        @media (max-width: 768px) {
          flex-direction: column;
          gap: 16px;
          text-align: center;
        }
      }
      
      .footer-left {
        display: flex;
        align-items: center;
        gap: 8px;
        
        .github-logo {
          color: #57606a;
        }
        
        .copyright {
          color: #57606a;
        }
      }
      
      .footer-links {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        align-items: center;
        
        a { 
          color:  #57606a;
          text-decoration: none;
          &:hover { text-decoration: underline; }
        }
        
        @media (max-width: 768px) {
          justify-content: center;
        }
      }
    }
    .empty-tab-content {
      text-align: center;
      padding: 80px 40px;
      color: var(--gh-text-primary);
      border: 1px solid var(--gh-border);
      border-radius: 6px;
      background-color: #fff;
      
      h3 { margin-top: 0; font-weight: 600; }
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  repos: Repo[] = [];
  contributionData: any[] = [];
  activeTab: string = 'overview';

  activeTab$;

  constructor(
    private githubService: GithubService,
    private profileState: ProfileStateService
  ) {
    this.activeTab$ = this.profileState.activeTab$;
  }

  ngOnInit() {
    this.githubService.getUser('shreeramk').subscribe(user => {
      this.user = user;
    });

    this.githubService.getRepos('shreeramk').subscribe(repos => {
      this.repos = repos;
    });

    this.githubService.getContributionData().subscribe(data => {
      this.contributionData = data;
    });
  }
}
