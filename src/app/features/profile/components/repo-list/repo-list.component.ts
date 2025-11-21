import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Repo } from '../../../../core/models/repo.model';

@Component({
    selector: 'app-repo-list',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
    <div class="repo-list-container">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="section-title">Popular repositories</h2>
        <a href="#" class="customize-link">Customize your pins</a>
      </div>

      <div class="repo-grid">
        <div class="repo-card" *ngFor="let repo of repos">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <a [href]="repo.html_url" class="repo-name">{{ repo.name }}</a>
            <span class="badge">{{ repo.private ? 'Private' : 'Public' }}</span>
          </div>
          <div class="repo-desc" *ngIf="repo.description">{{ repo.description }}</div>
          
          <div class="repo-meta mt-auto">
            <div class="d-flex align-items-center gap-3">
              <div class="language d-flex align-items-center" *ngIf="repo.language">
                <span class="lang-color" [style.background-color]="getLangColor(repo.language)"></span>
                {{ repo.language }}
              </div>
              <div class="stars d-flex align-items-center" *ngIf="repo.stargazers_count > 0">
                <lucide-icon name="star" [size]="16"></lucide-icon>
                {{ repo.stargazers_count }}
              </div>
              <div class="forks d-flex align-items-center" *ngIf="repo.forks_count > 0">
                <lucide-icon name="git-fork" [size]="16"></lucide-icon>
                {{ repo.forks_count }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .section-title {
      font-size: 16px;
      font-weight: 400;
      margin: 0;
      color: var(--gh-text-primary);
    }
    .customize-link {
      font-size: 12px;
      color: var(--gh-text-secondary);
      &:hover { color: var(--gh-link); }
    }
    .repo-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
    .repo-card {
      border: 1px solid var(--gh-border);
      border-radius: 6px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      min-height: 100px;
      background-color: #fff;
    }
    .repo-name {
      font-weight: 600;
      font-size: 14px;
      color: var(--gh-link);
      &:hover { text-decoration: underline; }
    }
    .badge {
      border: 1px solid var(--gh-border);
      border-radius: 2em;
      padding: 0 7px;
      font-size: 12px;
      font-weight: 500;
      color: var(--gh-text-secondary);
      line-height: 18px;
    }
    .repo-desc {
      font-size: 12px;
      color: var(--gh-text-secondary);
      margin-bottom: 16px;
      margin-top: 8px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .repo-meta {
      font-size: 12px;
      color: var(--gh-text-secondary);
      
      lucide-icon { margin-right: 4px; color: var(--gh-text-secondary); }
    }
    .lang-color {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 4px;
      display: inline-block;
      position: relative;
      top: 1px;
    }
  `]
})
export class RepoListComponent {
    @Input() repos: Repo[] = [];

    getLangColor(lang: string): string {
        const colors: { [key: string]: string } = {
            'TypeScript': '#3178c6',
            'JavaScript': '#f1e05a',
            'Python': '#3572A5',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Java': '#b07219',
            'Dart': '#00B4AB',
            'Jupyter Notebook': '#DA5B0B'
        };
        return colors[lang] || '#ccc';
    }
}
