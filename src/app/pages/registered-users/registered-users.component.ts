import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CmsServiceService } from 'src/app/services/cms-service.service';
@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css'],
})
export class RegisteredUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchForm: FormGroup;

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private cmsService: CmsServiceService,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      Number: [''],
    });
  }

  ngOnInit(): void {
    this.getAllUser();
  }
  get startItem() {
    if (this.totalItems === 0) return 0;
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem() {
    if (this.totalItems === 0) return 0;
    const end = this.currentPage * this.itemsPerPage;
    return end > this.totalItems ? this.totalItems : end;
  }

  get pageNumbers() {
    const pages: (number | string)[] = [];
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 3) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (current <= 3) {
        pages.push(2);
        pages.push(3);
        pages.push('...');
        pages.push(total);
      } else {
        pages.push('...');
        pages.push(current);
        if (current + 1 <= total) {
          pages.push(current + 1);
        }
        if (current + 1 < total) {
          pages.push('...');
        }
        pages.push(total);
      }
    }

    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.getAllUser();
    }
  }

  goToFirst() {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.getAllUser();
    }
  }

  goToPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllUser();
    }
  }

  goToNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllUser();
    }
  }

  goToLast() {
    if (this.currentPage !== this.totalPages) {
      this.currentPage = this.totalPages;
      this.getAllUser();
    }
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  onPageClick(page: number | string) {
    if (this.isNumber(page)) {
      this.goToPage(page as number);
    }
  }

  isActivePage(page: number | string): boolean {
    return this.isNumber(page) && page === this.currentPage;
  }
  getAllUser() {
    this.cmsService.guest().subscribe((res: any) => {
      if (res.success) {
        this.users = res.result.users;
        this.filteredUsers = [...this.users];

        this.totalItems = res.result.totalItems || this.users.length;
        this.totalPages = res.result.totalPages || 1;
        this.currentPage = (res.esult.currentPage ?? 0) + 1;
      }
    });
  }

  onSearch() {
    const keyword = this.searchForm.get('Number')?.value?.trim() || '';
    console.log(keyword, 'this is the keyword');
    let page = this.currentPage - 1;
    let size = this.itemsPerPage;
    if (!keyword) {
      this.getAllUser(); // show all if search is empty
      return;
    }

    this.cmsService.searchG({ keyword }).subscribe((res: any) => {
      if (res.success) {
        this.filteredUsers = res.result || [];
        this.totalItems = this.filteredUsers.length;
        this.totalPages = 1;
        this.currentPage = 1;
      } else {
        this.filteredUsers = [];
        this.totalItems = 0;
        this.totalPages = 0;
        this.currentPage = 1;
      }
    });
  }
}
