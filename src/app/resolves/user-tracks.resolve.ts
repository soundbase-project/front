import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Track } from 'src/app/models/track';
import { UserService } from 'src/app/services/user.service';
import { Pagination } from '../models/pagination/pagination';

@Injectable({
  providedIn: 'root',
})
export class UserTracksResolve implements Resolve<Pagination<Track>> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pagination<Track>> {
    return this.userService.getUserTracks(route.params.username, 1, 10);
  }
}
