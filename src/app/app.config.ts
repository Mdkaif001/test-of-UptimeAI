import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import {
  LucideAngularModule,
  Github,
  Bell,
  Plus,
  User,
  Smile,
  Users,
  Building,
  MapPin,
  Mail,
  Link,
  Twitter,
  Star,
  GitFork,
  BookOpen,
  Book,
  Layout,
  Package,
  GitCommit,
  GitPullRequest,
  ChevronsUpDown,
  Inbox,
  CircleDot,
  Menu,
  ChevronDown
} from 'lucide-angular';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    importProvidersFrom(
      LucideAngularModule.pick({
        Github, Bell, Plus, User, Smile, Users, Building, MapPin, Mail, Link,
        Twitter, Star, GitFork, BookOpen, Book, Layout, Package, GitCommit,
        GitPullRequest, ChevronsUpDown,
        CircleDot, Inbox, Menu, ChevronDown
      })
    )
  ]
};
