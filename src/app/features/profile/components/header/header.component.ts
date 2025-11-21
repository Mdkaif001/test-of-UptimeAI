import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Github, Menu, Plus, ChevronDown, CircleDot, GitPullRequest, Inbox, BookOpen, Book, Layout, Package, Star } from 'lucide-angular';
import { ProfileStateService } from '../../services/profile-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <header class="header d-flex align-items-center justify-content-between">
      <div class="logo-section">
        <button class="menu-btn">
          <lucide-icon name="menu" [size]="20"></lucide-icon>
        </button>
        <a href="#" class="logo">
          <lucide-icon name="github" [size]="32" color="#24292f"></lucide-icon>
        </a>
        <span class="username-breadcrumb">shreeramk</span>
      </div>

      <div class="d-flex align-items-center gap-3">
        <div class="search-container">
          <input type="text" placeholder="Type / to search" />
          <span class="slash-badge">/</span>
        </div>
        
        <div class="header-actions">
          <button class="icon-btn new-btn">
            <lucide-icon name="plus" [size]="16"></lucide-icon>
            <lucide-icon name="chevron-down" [size]="12"></lucide-icon>
          </button>
          <button class="icon-btn">
            <lucide-icon name="circle-dot" [size]="16"></lucide-icon>
          </button>
          <button class="icon-btn">
            <lucide-icon name="git-pull-request" [size]="16"></lucide-icon>
          </button>
          <button class="icon-btn">
            <lucide-icon name="inbox" [size]="16"></lucide-icon>
          </button>
          <button class="avatar-btn">
            <img src="https://avatars.githubusercontent.com/u/583231?v=4" alt="User" />
          </button>
        </div>
      </div>
    </header>
    
    <div class="header-tabs-container">
      <div class="container">
        <nav class="tabs-nav" style="margin-left: -65px;">
          <a href="javascript:void(0)" class="tab-item" [class.active]="(activeTab$ | async) === 'overview'" (click)="setActiveTab('overview')">
            <lucide-icon name="book-open" [size]="16"></lucide-icon>
            Overview
          </a>
          <a href="javascript:void(0)" class="tab-item" [class.active]="(activeTab$ | async) === 'repositories'" (click)="setActiveTab('repositories')">
            <lucide-icon name="book" [size]="16"></lucide-icon>
            Repositories
            <span class="counter">31</span>
          </a>
          <a href="javascript:void(0)" class="tab-item" [class.active]="(activeTab$ | async) === 'projects'" (click)="setActiveTab('projects')">
            <lucide-icon name="layout" [size]="16"></lucide-icon>
            Projects
          </a>
          <a href="javascript:void(0)" class="tab-item" [class.active]="(activeTab$ | async) === 'packages'" (click)="setActiveTab('packages')">
            <lucide-icon name="package" [size]="16"></lucide-icon>
            Packages
            <span class="counter">5</span>
          </a>
          <a href="javascript:void(0)" class="tab-item" [class.active]="(activeTab$ | async) === 'stars'" (click)="setActiveTab('stars')">
            <lucide-icon name="star" [size]="16"></lucide-icon>
            Stars
            <span class="counter">6</span>
          </a>
        </nav>
      </div>
    </div>
  `,
  styles: [`
    .header {
      background-color: #f6f8fa;
      color: var(--gh-text-primary);
      padding: 12px 24px;
      height: 64px;
      width: 100%;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .header-tabs-container {
      background-color: #f6f8fa;
      position: sticky;
      top: 64px;
      z-index: 90;
      padding-top: 4px;
      border-bottom: 1px solid #d0d7de;
    }
    .tabs-nav {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      
      /* Hide scrollbar */
      scrollbar-width: none;
      &::-webkit-scrollbar { display: none; }
      
      .tab-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        color: var(--gh-text-primary);
        font-size: 14px;
        border-bottom: 3px solid transparent;
        white-space: nowrap;
        transition: border-bottom-color 0.2s;
        cursor: pointer;
        margin-bottom: -1px; /* Overlap border */
        
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
    .logo-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .logo {
      display: flex;
      align-items: center;
      color: var(--gh-text-primary);
      &:hover { opacity: 0.7; }
    }
    .username-breadcrumb {
      font-weight: 600;
      font-size: 14px;
      color: var(--gh-text-primary);
      padding: 4px 8px;
      border-radius: 6px;
      &:hover { background-color: var(--gh-btn-hover); }
    }
    .search-container {
      position: relative;
      
      input {
        background: #fff;
        border: 1px solid var(--gh-border);
        border-radius: 6px;
        padding: 4px 12px;
        color: var(--gh-text-primary);
        width: 250px;
        height: 32px;
        font-size: 14px;
        transition: 0.2s;
        
        &:focus {
          border-color: var(--gh-link);
          box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.3);
          width: 350px;
          outline: none;
        }
      }
      
      .slash-badge {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        border: 1px solid var(--gh-border);
        border-radius: 4px;
        padding: 0 6px;
        font-size: 10px;
        color: var(--gh-text-secondary);
        line-height: 18px;
        background: #f6f8fa;
      }
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .icon-btn {
      background: transparent;
      border: 1px solid var(--gh-border);
      border-radius: 6px;
      color: var(--gh-text-primary);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      
      &:hover { background-color: var(--gh-btn-hover); }
    }
    .new-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 0 8px;
      width: auto;
    }
    .avatar-btn {
      background: transparent;
      border: none;
      padding: 0;
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-left: 4px;
      
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid var(--gh-border);
      }
    }
    .menu-btn {
      background: transparent;
      border: 1px solid var(--gh-border);
      border-radius: 6px;
      padding: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--gh-text-primary);
      margin-right: 16px;
    }
    
    @media (max-width: 768px) {
      .header { padding: 12px 16px; }
      .search-container { display: none; }
      .username-breadcrumb { display: none; }
      .header-tabs-container { display: none; /* Hide tabs in header on mobile if needed, or keep them */ }
    }
  `]
})
export class HeaderComponent {
  activeTab$;

  constructor(private profileState: ProfileStateService) {
    this.activeTab$ = this.profileState.activeTab$;
  }

  setActiveTab(tab: string) {
    this.profileState.setActiveTab(tab);
  }
}
