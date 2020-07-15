import { Component, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track';
import { PlayerService } from 'src/app/services/player.service';
import { TrackService } from 'src/app/services/track.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  s3Bucket: string;
  s3Endpoint: string;

  track: Track = null;

  constructor(
    public playerService: PlayerService,
    public trackService: TrackService,
  ) {
    this.s3Bucket = environment.s3_bucket;
    this.s3Endpoint = environment.s3_endpoint;
  }

  ngOnInit(): void {
    const player = document.getElementsByTagName(
      'audio',
    )[0] as HTMLAudioElement;

    player.addEventListener('pause', () => {
      // Workaround because the `ended` event is not reliable.
      if (Math.round(player.currentTime) === this.track.duration) {
        this.trackService.addListening(this.track).subscribe(() => {});
      }
    });

    this.playerService.playTrackEvent.subscribe((track: Track) => {
      this.track = track;

      // Once the track has been loaded, play it
      player.onloadeddata = () => {
        player.play();
      };
    });
  }

  onEnded() {
    // This event is not reliable!
    // https://github.com/vmudigal/ngx-audio-player/issues/66
    // See the `pause` eventListener above instead.
  }
}
