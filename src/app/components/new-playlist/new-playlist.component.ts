import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaylistsService } from '../../services/playlists.service';

@Component({
  selector: 'app-new-playlist',
  templateUrl: './new-playlist.component.html',
  styleUrls: ['./new-playlist.component.scss'],
})
export class NewPlaylistComponent implements OnInit {
  playlistsForm: FormGroup;
  requiredFieldAlert = 'This field is required';

  constructor(
    private formBuilder: FormBuilder,
    private playlistsService: PlaylistsService,
  ) {}

  ngOnInit(): void {
    this.initPlaylistsForm();
  }

  initPlaylistsForm() {
    this.playlistsForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
    });
  }

  resetForm() {
    this.playlistsForm.reset();
  }

  onSubmitPlaylistsForm() {
    const newPlaylist = this.playlistsForm.value;
    this.playlistsService.create(newPlaylist);
    this.resetForm();
  }
}
