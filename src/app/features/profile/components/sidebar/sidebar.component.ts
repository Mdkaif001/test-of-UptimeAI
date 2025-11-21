import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="sidebar" *ngIf="user">
      <div class="avatar-container">
        <img [src]="user.avatar_url" [alt]="user.login" class="avatar" />
        <div class="status-badge">
          <lucide-icon name="smile" [size]="16"></lucide-icon>
        </div>
      </div>
      
      <div class="names">
        <h1 class="fullname">{{ user.name }}</h1>
        <h2 class="username">{{ user.login }}</h2>
      </div>

      <div class="bio" *ngIf="user.bio">{{ user.bio }}</div>

      <button class="btn btn-default btn-block mb-3">Edit profile</button>

      <div class="followers-section">
        <lucide-icon name="users" [size]="16" class="text-muted"></lucide-icon>
        <span class="fw-bold">{{ user.followers }}</span> <span class="text-muted">followers</span>
        <span class="dot">·</span>
        <span class="fw-bold">{{ user.following }}</span> <span class="text-muted">following</span>
      </div>

      <div class="details">
        <div class="detail-item" *ngIf="user.company">
          <lucide-icon name="building" [size]="16"></lucide-icon>
          <span>{{ user.company }}</span>
        </div>
        <div class="detail-item" *ngIf="user.location">
          <lucide-icon name="map-pin" [size]="16"></lucide-icon>
          <span>{{ user.location }}</span>
        </div>
        <div class="detail-item" *ngIf="user.email">
          <lucide-icon name="mail" [size]="16"></lucide-icon>
          <a [href]="'mailto:' + user.email">{{ user.email }}</a>
        </div>
        <div class="detail-item" *ngIf="user.blog">
          <lucide-icon name="link" [size]="16"></lucide-icon>
          <a [href]="user.blog" target="_blank">{{ user.blog }}</a>
        </div>
        <div class="detail-item" *ngIf="user.twitter_username">
          <lucide-icon name="twitter" [size]="16"></lucide-icon>
          <a [href]="'https://twitter.com/' + user.twitter_username" target="_blank">&#64;{{ user.twitter_username }}</a>
        </div>
      </div>

      <div class="achievements">
        <h3 class="section-title">Achievements</h3>
        <div class="badges">
          <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" alt="Pull Shark" width="64" />
          <img src="https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png" alt="YOLO" width="64" />
          <img src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png" alt="Quickdraw" width="64" />
        </div>
      </div>
      
      <div class="organizations">
        <h3 class="section-title">Organizations</h3>
        <div class="org-avatars">
             <img src="https://avatars.githubusercontent.com/u/1089146?s=64&v=4" alt="Org" width="32" height="32" style="border-radius: 6px; border: 1px solid var(--gh-border);" />
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      padding-right: 24px;
      position: relative;
      top: -30px; /* Avatar overlaps header slightly in some designs, but here we keep it standard or adjust */
    }
    .avatar-container {
      position: relative;
      margin-bottom: 16px;
      z-index: 4;
      
      .avatar {
        width: 296px;
        height: 296px;
        border-radius: 50%;
        border: 1px solid var(--gh-border-secondary);
        box-shadow: 0 0 0 1px rgba(27,31,35,0.04);
        z-index: 1;
        background-color: var(--gh-bg);
      }
      
      .status-badge {
        position: absolute;
        bottom: 40px;
        right: 0;
        background: #fff;
        border: 1px solid var(--gh-border-secondary);
        border-radius: 2em;
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        cursor: pointer;
        color: var(--gh-text-secondary);
        transition: 0.2s;
        
        &:hover { 
          color: var(--gh-link); 
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          transform: scale(1.05);
        }
      }
    }
    .names {
      margin-bottom: 16px;
      padding-top: 16px;
      .fullname {
        font-size: 26px; /* Increased from 24px */
        line-height: 1.25;
        margin: 0;
        font-weight: 700; /* Bolder */
        color: var(--gh-text-primary);
      }
      .username {
        font-size: 20px;
        font-style: normal;
        font-weight: 300;
        line-height: 24px;
        color: #57606a; /* Specific gray from screenshot */
        margin: 0;
      }
    }
    .bio {
      font-size: 16px;
      margin-bottom: 16px;
      color: var(--gh-text-primary);
      line-height: 1.5;
    }
    
    .followers-section {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-bottom: 16px;
      color: var(--gh-text-secondary);
      flex-wrap: wrap;
      gap: 4px;
      
      lucide-icon { margin-right: 2px; color: var(--gh-text-secondary); }
      .dot { margin: 0 2px; }
      a { 
        color: var(--gh-text-primary); 
        font-weight: 600;
        &:hover { color: var(--gh-link); text-decoration: none; }
      }
      span.text-muted { font-weight: 400; color: var(--gh-text-secondary); }
    }
    .details {
      margin-bottom: 24px;
      .detail-item {
        display: flex;
        align-items: center;
        margin-top: 4px;
        font-size: 14px;
        color: var(--gh-text-primary);
        
        lucide-icon { 
          margin-right: 8px; 
          color: var(--gh-text-secondary); 
          min-width: 16px;
        }
        
        a { color: var(--gh-text-primary); text-decoration: none; &:hover { color: var(--gh-link); text-decoration: underline; } }
      }
    }
    .section-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
      margin-top: 24px;
      color: var(--gh-text-primary);
    }
    .badges {
      display: flex;
      gap: 8px;
      img { 
        width: 64px; 
        height: 64px; 
        transition: transform 0.2s;
        &:hover { transform: scale(1.1); }
      }
    }
    .org-avatars {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      img {
        border-radius: 6px;
        border: 1px solid var(--gh-border-secondary);
        cursor: pointer;
        transition: opacity 0.2s;
        &:hover { opacity: 0.8; }
      }
    }

    @media (max-width: 768px) {
      .sidebar { padding-right: 0; top: 0; }
      .avatar-container {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 8px;
        
        .avatar {
          width: 15%; /* Smaller avatar on mobile */
          height: auto;
          min-width: 64px;
        }
        .status-badge {
          bottom: 0;
          right: auto;
          left: 40px;
          width: 24px;
          height: 24px;
          lucide-icon { width: 14px; height: 14px; }
        }
      }
      .names { padding-top: 0; }
    }
  `]
})
export class SidebarComponent {
  @Input() user: User | null = null;
}
