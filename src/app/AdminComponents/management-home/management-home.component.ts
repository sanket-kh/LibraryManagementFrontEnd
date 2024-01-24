import {Component, inject, OnInit} from '@angular/core';
import {ReportStatService} from "../services/ReportStatService";
import {response} from "express";
import {UserService} from "../../UserComponents/services/userService";

@Component({
  selector: 'app-management-home',
  templateUrl: './management-home.component.html',
  styleUrl: './management-home.component.css'
})
export class ManagementHomeComponent implements OnInit{
  reportStatService: ReportStatService = inject(ReportStatService)
  userService:UserService = inject(UserService)



  availableBookCount: number = 0
  totalBookCount: number = 0
  totalUniqueBooks: number = 0
  totalCurrentlyBorrowedBook: number = 0
  currentlyBorrowedUniqueBook: number = 0

  totalUserCount: number = 0
  totalActiveUserCount: number = 0
  totalLockedUserCount: number = 0
  totalDisabledUsers: number = 0

  getTotalBookCount() {
    this.reportStatService.getTotalBookCount().subscribe({
      next: response => {
        this.totalBookCount = Number(response.responseBody)
      }
    })
  }

  getTotalAvailableBookCount() {
    this.reportStatService.getTotalAvailableBookCount().subscribe({
      next: response => {
        this.availableBookCount = Number(response.responseBody)
      }
    })
  }


  getUniqueBookCount() {
    this.reportStatService.getUniqueBookCount().subscribe({
      next: response => {
        this.totalUniqueBooks = Number(response.responseBody)
      }
    })

  }

  getTotalBorrowedBookCount() {
    this.reportStatService.getTotalBorrowedBookCount().subscribe({
      next: response => {
        this.totalCurrentlyBorrowedBook = Number(response.responseBody)
      }
    })

  }

  getUniqueBorrowedBookCount() {
    this.reportStatService.getUniqueBorrowedBookCount().subscribe({
      next: response => {
        this.currentlyBorrowedUniqueBook = Number(response.responseBody)
      }
    })

  }

  getTotalUserCount() {
    this.reportStatService.getTotalUserCount().subscribe({
      next: response => {
        this.totalUserCount = Number(response.responseBody)
      }
    })

  }

  getActiveUserCount() {
    this.reportStatService.getActiveUserCount().subscribe({
      next: response => {
        this.totalActiveUserCount = Number(response.responseBody)
      }
    })

  }

  getLockedUserCount() {
    this.reportStatService.getLockedUserCount().subscribe({
      next: response => {
        this.totalLockedUserCount = Number(response.responseBody)
      }
    })

  }

  getDisabledUserCount() {
    this.reportStatService.getDisabledUserCount().subscribe({
      next: response => {
        this.totalDisabledUsers = Number(response.responseBody)
      }
    })
  }

  ngOnInit(): void {
    this.getTotalAvailableBookCount()
    this.getLockedUserCount()
    this.getActiveUserCount()
    this.getDisabledUserCount()
    this.getTotalBorrowedBookCount()
    this.getTotalBookCount()
    this.getTotalUserCount()
    this.getUniqueBookCount()
    this.getUniqueBorrowedBookCount()

  }
}

