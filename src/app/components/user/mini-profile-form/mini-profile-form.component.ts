import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../../models/user';
import {UpdateUser} from '../../../models/user/update-user';
import {ProfileBackground} from '../../../models/user/profile-background';
import {MiniProfileBackground} from '../../../models/user/mini-profile-background';
import {EditProfileService} from '../../../services/user/edit-profile.service';

@Component({
  selector: 'app-mini-profile-form',
  templateUrl: './mini-profile-form.component.html',
  styleUrls: ['./mini-profile-form.component.scss']
})
export class MiniProfileFormComponent implements OnInit, OnChanges {

  @Input() user: User;
  currentUser: UpdateUser;

  isSuccess: boolean;
  isError: boolean;

  selectedBackground: MiniProfileBackground;
  backgrounds: MiniProfileBackground[];

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
      this.selectedBackground = this.user.miniProfileBackground;
      this.backgrounds = this.user.miniProfileBackgrounds;
    }
  }

  changePreview(backgroundId: number): void {
    this.backgrounds.forEach(background => {
      if (background.id === backgroundId) {
        this.selectedBackground = background;
      }
    });
  }

  onSave(): void {
    this.isError = false;
    this.isSuccess = false;
    this.currentUser.miniProfileBackgroundId = this.selectedBackground.id;
    this.service.updateUser(this.currentUser).subscribe(async query => {
      // @ts-ignore
      this.isSuccess = query.data.updateUser;
    }, (error) => {
      this.isError = true;
      console.log('There has been an error: ', error);
    });
  }

}
