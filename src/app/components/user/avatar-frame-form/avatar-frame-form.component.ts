import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../../models/user';
import {UpdateUser} from '../../../models/user/update-user';
import {ProfileBackground} from '../../../models/user/profile-background';
import {EditProfileService} from '../../../services/user/edit-profile.service';
import {AvatarFrame} from '../../../models/user/avatar-frame';

@Component({
  selector: 'app-avatar-frame-form',
  templateUrl: './avatar-frame-form.component.html',
  styleUrls: ['./avatar-frame-form.component.scss']
})
export class AvatarFrameFormComponent implements OnInit, OnChanges {

  @Input() user: User;
  currentUser: UpdateUser;

  isSuccess: boolean;
  isError: boolean;

  selectedFrame: AvatarFrame;
  frames: AvatarFrame[];

  constructor(
    private service: EditProfileService,
  ) {
    this.user = new User();
    this.currentUser = new UpdateUser(this.user);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user.profileName !== undefined || this.currentUser !== undefined) {
      this.currentUser = new UpdateUser(this.user);
      this.selectedFrame = this.user.avatarFrame;
      this.frames = this.user.avatarFrames;
    }
  }

  changePreview(avatarFrameId: number): void {
    this.frames.forEach(frame => {
      if (frame.id === avatarFrameId) {
        this.selectedFrame = frame;
      }
    });
  }

  onSave(): void {
    this.isError = false;
    this.isSuccess = false;
    this.currentUser.avatarFrameId = this.selectedFrame.id;
    this.service.updateUser(this.currentUser).subscribe(async query => {
      // @ts-ignore
      this.isSuccess = query.data.updateUser;
    }, (error) => {
      this.isError = true;
      console.log('There has been an error: ', error);
    });
  }

}
