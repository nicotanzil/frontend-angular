import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {GameDiscussionReply} from '../../../models/community/game-discussion-reply';
import {ActivatedRoute} from '@angular/router';
import {GameDiscussionService} from '../../../services/community/game-discussion.service';
import {AuthService} from '../../../services/auth.service';
import {GameDiscussion} from '../../../models/community/game-discussion';

@Component({
  selector: 'app-discussion-detail-page',
  templateUrl: './discussion-detail-page.component.html',
  styleUrls: ['./discussion-detail-page.component.scss']
})
export class DiscussionDetailPageComponent implements OnInit {

  profileUser: User;
  user: User;
  isUser: boolean;

  discussionId: number;
  discussion: GameDiscussion;
  comments: GameDiscussionReply[];

  comment: string;

  constructor(
    private actRoute: ActivatedRoute,
    private service: GameDiscussionService,
    private authService: AuthService,
  ) {
    this.profileUser = new User();
    this.user = new User();
    this.discussion = new GameDiscussion();
    this.comments = [];
  }

  ngOnInit(): void {
    this.isUser = false;
    this.profileUser = new User();
    this.authService.getUserAuth().subscribe(async query => {
      this.user = query.data.getUserAuth;
      this.isUser = true;
      this.init();
    }, error => {
      this.isUser = false;
      this.init();
      console.log(error);
    });
  }

  init(): void {
    this.discussionId = this.actRoute.snapshot.params.id;
    this.service.getGameDiscussionByDiscussionId(this.discussionId).subscribe(async query => {
      this.discussion = query.data.getGameDiscussionByDiscussionID;
      console.log(this.discussion);
    }, error => {
      console.log(error);
    });
  }

  submitComment(): void {
    this.service.insertCommentByReviewId(this.discussionId, this.user.id, this.comment).subscribe(async query => {
      alert('Comment added!');
    }, error => {
      console.log(error);
    });
  }

}
