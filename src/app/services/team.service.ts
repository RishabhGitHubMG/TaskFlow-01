import { Injectable, signal } from '@angular/core';

export interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member' | 'viewer';
  avatar?: string;
  joinedAt: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teams = signal<Team[]>(this.getDefaultTeams());
  private currentTeam = signal<Team | null>(this.teams()[0] || null);

  getCurrentTeam() {
    return this.currentTeam();
  }

  getTeams() {
    return this.teams();
  }

  setCurrentTeam(teamId: string) {
    const team = this.teams().find(t => t.id === teamId);
    if (team) {
      this.currentTeam.set(team);
    }
  }

  addMember(teamId: string, member: TeamMember) {
    this.teams.update(teams =>
      teams.map(team =>
        team.id === teamId
          ? { ...team, members: [...team.members, member] }
          : team
      )
    );
  }

  removeMember(teamId: string, memberId: string) {
    this.teams.update(teams =>
      teams.map(team =>
        team.id === teamId
          ? { ...team, members: team.members.filter(m => m.id !== memberId) }
          : team
      )
    );
  }

  private getDefaultTeams(): Team[] {
    return [
      {
        id: '1',
        name: 'Development',
        description: 'Core development team',
        members: [
          {
            id: '1',
            email: 'john@taskflow.com',
            name: 'John Doe',
            role: 'admin',
            joinedAt: new Date().toISOString()
          },
          {
            id: '2',
            email: 'sarah@taskflow.com',
            name: 'Sarah Smith',
            role: 'member',
            joinedAt: new Date().toISOString()
          },
          {
            id: '3',
            email: 'mike@taskflow.com',
            name: 'Mike Johnson',
            role: 'member',
            joinedAt: new Date().toISOString()
          }
        ],
        createdAt: new Date().toISOString()
      }
    ];
  }
}
