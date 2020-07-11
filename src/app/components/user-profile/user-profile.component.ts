import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../models/user';
import { Track } from 'src/app/models/track';
import { UserService } from 'src/app/services/user.service';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  currentUser: User;
  tracks: Track[];
  albums: Album[];

  constructor(
    public userService: UserService,
    public authService: AuthService,
  ) {
    this.userService.getUser(authService.username).subscribe((res) => {
      this.currentUser = res;
    });

    this.userService.getUserTracks(authService.username).subscribe((res) => {
      this.tracks = res;
    });

    this.userService.getUserAlbums(authService.username).subscribe((res) => {
      this.albums = res;
    });
  }

  ngOnInit() {}
}
