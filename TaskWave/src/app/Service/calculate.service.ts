import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  constructor() {}

  calculateDate(dueDate: string): number {
    const dueDateObj = new Date(dueDate);
    const now = new Date();
    const difference = Math.abs(now.getTime() - dueDateObj.getTime());
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return days;
  }

  calculateOriginalDate(dueDate: string, createdDate: string): number {
    const createdDateObj = new Date(createdDate.split('.')[0] || createdDate);
    const dueDateObj = new Date(dueDate);
    const difference = dueDateObj.getTime() - createdDateObj.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return days;
  }

  calculateRatioDate(dueDate: string, createdDate: string): number {
    const actualDelay = this.calculateDate(dueDate);
    const originalDelay = this.calculateOriginalDate(dueDate, createdDate);
    return originalDelay <= 1
      ? 0
      : Math.floor((actualDelay / originalDelay) * 100);
  }
}
