import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileStateService {
    private activeTabSubject = new BehaviorSubject<string>('overview');
    activeTab$ = this.activeTabSubject.asObservable();

    setActiveTab(tab: string) {
        this.activeTabSubject.next(tab);
    }

    getActiveTab() {
        return this.activeTabSubject.value;
    }
}
