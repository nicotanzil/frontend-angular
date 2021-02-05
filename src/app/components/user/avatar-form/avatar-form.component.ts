import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {EditProfileService} from '../../../services/user/edit-profile.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-avatar-form',
  templateUrl: './avatar-form.component.html',
  styleUrls: ['./avatar-form.component.scss']
})
export class AvatarFormComponent implements OnInit, DoCheck {

  constructor(
    private service: EditProfileService,
    private storage: AngularFireStorage,
  ) { }

  @Input() user: User;
  currentUser: User;

  isSuccess: boolean;
  isError: boolean;

  originalImage: any;
  avatarImage: any;
  selectedImage: any;

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.user.profileName === undefined || this.currentUser === undefined) {
      this.currentUser = this.user;
      this.avatarImage = this.currentUser.avatar;
      this.originalImage = this.currentUser.avatar;
    }
  }

  onSave(): void {
    // Validation here
    // ...
    this.isError = false;
    this.isSuccess = false;

    if (this.selectedImage !== null) {
      const path = `assets/users/${this.currentUser.id}/avatar`;
      const fileRef = this.storage.ref(path);
      this.storage.upload(path, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
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

  onCancel(): void {
    this.currentUser = this.user;
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
