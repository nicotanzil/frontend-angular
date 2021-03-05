import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../../models/user';
import {EditProfileService} from '../../../services/user/edit-profile.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {UpdateUser} from '../../../models/user/update-user';

@Component({
  selector: 'app-avatar-form',
  templateUrl: './avatar-form.component.html',
  styleUrls: ['./avatar-form.component.scss']
})
export class AvatarFormComponent implements OnInit, OnChanges {

  @Input() user: User;
  currentUser: UpdateUser;

  isSuccess: boolean;
  isError: boolean;

  originalImage: any;
  avatarImage: any;
  selectedImage: any;

  constructor(
    private service: EditProfileService,
    private storage: AngularFireStorage,
  ) {
    this.user = new User();
    this.currentUser = new UpdateUser(this.user);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user.profileName !== undefined || this.currentUser !== undefined) {
      this.currentUser = new UpdateUser(this.user);
      this.avatarImage = this.currentUser.avatar;
      this.originalImage = this.currentUser.avatar;
    }
  }

  onSave(): void {
    // Validation here
    // ...
    this.isError = false;
    this.isSuccess = false;
    console.log(this.avatarImage);
    console.log(this.selectedImage);

    if (this.selectedImage !== null) {
      const path = `assets/users/${this.user.id}/avatar`;
      const fileRef = this.storage.ref(path);
      this.storage.upload(path, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.currentUser.avatar = url;
            // Mutate to DB
            this.service.updateUser(this.currentUser).subscribe(async query => {
              // @ts-ignore
              this.isSuccess = query.data.updateUser;
            }, (error) => {
              this.isError = true;
              console.log('There has been an error: ', error);
            });
          });
        })
      ).subscribe();
    }
    // Mutation
    this.service.updateUser(this.currentUser).subscribe(async query => {
      // @ts-ignore
      this.isSuccess = query.data.updateUser;
    }, (error) => {
      this.isError = true;
      console.log('There has been an error: ', error);
    });
  }

  showPreview(event: any): void{
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.avatarImage = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.avatarImage = this.originalImage;
      this.selectedImage = null;
    }
  }
}
