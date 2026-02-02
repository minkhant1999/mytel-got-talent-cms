import { Component, OnInit } from '@angular/core';
import { CmsServiceService } from 'src/app/services/cms-service.service';

@Component({
  selector: 'app-voting-result',
  templateUrl: './voting-result.component.html',
  styleUrls: ['./voting-result.component.css'],
})
export class VotingResultComponent implements OnInit {
  constructor(private cmsService: CmsServiceService) {}
  ngOnInit(): void {
    this.getAllContestant();
  }

  getAllContestant() {
    const name = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    this.cmsService.participants({ name, password }).subscribe((data: any) => {
      console.log(data);
    });
  }
}
