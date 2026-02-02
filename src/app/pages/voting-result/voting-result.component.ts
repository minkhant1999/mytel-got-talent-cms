import { Component } from '@angular/core';
import { CmsServiceService } from 'src/app/services/cms-service.service';

@Component({
  selector: 'app-voting-result',
  templateUrl: './voting-result.component.html',
  styleUrls: ['./voting-result.component.css'],
})
export class VotingResultComponent {
  constructor(private cmsService: CmsServiceService) {}
}
