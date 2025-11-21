import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [],
  template: `
    <div class="activity-container">
      <div class="contribution-activity">
        <h3 class="section-title">Contribution activity</h3>
        
        <div class="timeline">
          <div class="month-header">
            <span class="month">October</span> <span class="year">2025</span>
            <div class="line"></div>
          </div>

          <div class="timeline-item">
            <div class="icon-container">
              <lucide-icon name="git-commit" [size]="16"></lucide-icon>
            </div>
            <div class="content">
              <div class="d-flex justify-content-between align-items-center">
                <span class="title">Created 56 commits in 11 repositories</span>
                <button class="collapse-btn"><lucide-icon name="chevrons-up-down" [size]="14"></lucide-icon></button>
              </div>
            </div>
          </div>

          <div class="timeline-item">
             <div class="icon-container">
              <lucide-icon name="git-pull-request" [size]="16"></lucide-icon>
            </div>
            <div class="content">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="title">Opened 29 pull requests in 5 repositories</span>
                 <button class="collapse-btn"><lucide-icon name="chevrons-up-down" [size]="14"></lucide-icon></button>
              </div>
              
              <div class="pr-list">
                <div class="pr-item d-flex justify-content-between">
                  <a href="#" class="repo-link">UptimeAI/uptime_webapp</a>
                  <div class="d-flex gap-2">
                    <span class="badge merged">16 merged</span>
                    <span class="badge open">1 open</span>
                  </div>
                </div>
                <div class="pr-item d-flex justify-content-between">
                  <a href="#" class="repo-link">UptimeAI/uptime_ml</a>
                  <span class="badge merged">6 merged</span>
                </div>
                 <div class="pr-item d-flex justify-content-between">
                  <a href="#" class="repo-link">UptimeAI/uptime_scripts</a>
                  <span class="badge merged">4 merged</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button class="show-more-btn">Show more activity</button>
      </div>
    </div>
  `,
  styles: [`
    .activity-container {
      margin-top: 24px;
      display: flex;
      flex-direction: column; /* Stack vertically by default */
      gap: 24px;
    }
    .contribution-activity {
      width: 100%;
    }
    .section-title {
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 16px;
      color: var(--gh-text-primary);
    }
    
    .timeline {
      position: relative;
      padding-left: 16px;
      border-left: 2px solid var(--gh-border);
      margin-left: 16px;
      padding-bottom: 24px;
    }
    .month-header {
      position: relative;
      margin-bottom: 16px;
      font-size: 12px;
      color: var(--gh-text-secondary);
      left: -24px;
      background: var(--gh-bg);
      padding: 4px 8px;
      width: 100%;
    }
    .timeline-item {
      position: relative;
      margin-bottom: 24px;
      padding-left: 16px;
      
      .icon-container {
        position: absolute;
        left: -34px;
        width: 32px;
        height: 32px;
        background: var(--gh-btn-bg);
        border: 2px solid var(--gh-bg);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--gh-text-secondary);
        z-index: 1;
      }
      
      .content {
        font-size: 14px;
      }
      .title {
        font-weight: 400;
        color: var(--gh-text-primary);
      }
    }
    .collapse-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--gh-text-secondary);
      padding: 4px;
      &:hover { color: var(--gh-link); }
    }
    .pr-list {
      margin-top: 8px;
    }
    .pr-item {
      margin-bottom: 4px;
      font-size: 12px;
      align-items: center;
    }
    .repo-link {
      color: var(--gh-text-primary);
      font-weight: 500;
      &:hover { color: var(--gh-link); text-decoration: underline; }
    }
    .badge {
      border-radius: 2em;
      padding: 0 8px;
      font-size: 10px;
      height: 18px;
      display: flex;
      align-items: center;
      font-weight: 500;
      border: 1px solid transparent;
      
      &.merged {
        background-color: rgba(130, 80, 223, 0.1); // #8250df with opacity
        color: #8250df;
        border-color: rgba(130, 80, 223, 0.2);
      }
      &.open {
        background-color: rgba(45, 164, 78, 0.1); // #2da44e with opacity
        color: #2da44e;
        border-color: rgba(45, 164, 78, 0.2);
      }
    }
    .show-more-btn {
      width: 100%;
      padding: 8px;
      background: #fff;
      border: 1px solid var(--gh-border-secondary);
      border-radius: 6px;
      color: var(--gh-text-secondary);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.2s;
      &:hover { background: var(--gh-btn-hover); color: var(--gh-link); border-color: #8b949e; }
    }
  `]
})
export class ActivityComponent {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}
