import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from '../../../models/team';
import { ApiService } from '../../../service/api.service';
import { MatButton } from '@angular/material/button';
import { EditTeamComponent } from '../../popups/edit-popups/edit-team/edit-team.component';
import { City } from '../../../models/city';
import { Stadium } from '../../../models/stadium';
import { MatDialog } from '@angular/material/dialog';
import { Division } from '../../../models/division';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-item',
  standalone: true,
  imports: [MatButton, CommonModule],
  templateUrl: './team-item.component.html',
  styleUrl: './team-item.component.css',
})
export class TeamItemComponent implements OnInit {
  @Input() team: Team | undefined;
  @Input() stadiums: Stadium[] = [];
  @Input() cities: City[] = [];
  @Input() divisions: Division[] = [];
  @Input() isFirst: boolean = false;
  @Output() refreshTeams: EventEmitter<void> = new EventEmitter<void>();

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  deleteTeam() {
    if (this.team?.id) {
      this.apiService.deleteTeam(this.team.id).subscribe((result) => {
        if (result) {
          this.refreshListTeams(); // Trigger refresh event
        }
      });
    }
  }

  refreshListTeams() {
    this.refreshTeams.emit();
  }

  openTeamEditPopup() {
    const dialogRef = this.dialog.open(EditTeamComponent, {
      width: '40%',
      height: 'auto',
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      data: {
        team: this.team,
        stadiums: this.stadiums,
        cities: this.cities,
        divisions: this.divisions,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshListTeams();
      }
    });
  }
}
