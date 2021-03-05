import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EditProfileService} from '../../../services/user/edit-profile.service';
import {User} from '../../../models/user';
import {UpdateUser} from '../../../models/user/update-user';
import {ProfileBackground} from '../../../models/user/profile-background';

@Component({
  selector: 'app-profile-background-form',
  templateUrl: './profile-background-form.component.html',
  styleUrls: ['./profile-background-form.component.scss']
})
export class ProfileBackgroundFormComponent implements OnInit, OnChanges {


  @Input() user: User;
  currentUser: UpdateUser;

  isSuccess: boolean;
  isError: boolean;

  selectedBackground: ProfileBackground;
  backgrounds: ProfileBackground[];

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
      this.selectedBackground = this.user.profileBackground;
      this.backgrounds = this.user.profileBackgrounds;
    }
  }

  changePreview(profileBackgroundId: number): void {
    this.backgrounds.forEach(background => {
      if (background.id === profileBackgroundId) {
        this.selectedBackground = background;
      }
    });
  }

  onSave(): void {
    this.isError = false;
    this.isSuccess = false;
    this.currentUser.profileBackgroundId = this.selectedBackground.id;
    this.service.updateUser(this.currentUser).subscribe(async query => {
      // @ts-ignore
      this.isSuccess = query.data.updateUser;
    }, (error) => {
      this.isError = true;
      console.log('There has been an error: ', error);
    });
  }

}
