import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../../models/user';
import {UpdateUser} from '../../../models/user/update-user';
import {ProfileBackground} from '../../../models/user/profile-background';
import {Badge} from '../../../models/badge';
import {EditProfileService} from '../../../services/user/edit-profile.service';

@Component({
  selector: 'app-featured-badge-form',
  templateUrl: './featured-badge-form.component.html',
  styleUrls: ['./featured-badge-form.component.scss']
})
export class FeaturedBadgeFormComponent implements OnInit, OnChanges {

  @Input() user: User;
  currentUser: UpdateUser;

  isSuccess: boolean;
  isError: boolean;

  featuredBadge: Badge;
  badges: Badge[];

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
      this.featuredBadge = this.user.featuredBadge;
      this.badges = this.user.badges;
    }
  }

  changePreview(badgeId: number): void {
    this.badges.forEach(badge => {
      if (badge.id === badgeId) {
        this.featuredBadge = badge;
      }
    });
  }

  onSave(): void {
    this.isError = false;
    this.isSuccess = false;
    this.currentUser.featuredBadgeId = this.featuredBadge.id;
    console.log(this.featuredBadge.id);
    this.service.updateUser(this.currentUser).subscribe(async query => {
      // @ts-ignore
      this.isSuccess = query.data.updateUser;
    }, (error) => {
      this.isError = true;
      console.log('There has been an error: ', error);
    });
  }

}
