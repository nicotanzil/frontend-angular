import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../../models/user';
import {UpdateUser} from '../../../models/user/update-user';
import {ProfileBackground} from '../../../models/user/profile-background';
import {Theme} from '../../../models/user/theme';
import {EditProfileService} from '../../../services/user/edit-profile.service';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent implements OnInit, OnChanges {

  @Input() user: User;
  currentUser: UpdateUser;

  isSuccess: boolean;
  isError: boolean;

  selectedTheme: Theme;
  themes: Theme[];

  constructor(
    private service: EditProfileService,
  ) {
    this.user = new User();
    this.currentUser = new UpdateUser(this.user);
    this.themes = [];
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user.profileName !== undefined || this.currentUser !== undefined) {
      this.currentUser = new UpdateUser(this.user);
      this.selectedTheme = this.user.theme;
      this.service.themes().subscribe(async query => {
        this.themes = query.data.themes;
      }, error => {
        console.log(error);
      });
    }
  }

  changePreview(themeId: number): void {
    this.themes.forEach(theme => {
      if (theme.id === themeId) {
        this.selectedTheme = theme;
      }
    });
  }

  onSave(): void {
    this.isError = false;
    this.isSuccess = false;
    this.currentUser.themeId = this.selectedTheme.id;
    this.service.updateUser(this.currentUser).subscribe(async query => {
      // @ts-ignore
      this.isSuccess = query.data.updateUser;
    }, (error) => {
      this.isError = true;
      console.log('There has been an error: ', error);
    });
  }

}
