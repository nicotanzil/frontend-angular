import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../../models/user';
import {CommunityGameReview} from '../../../models/community/community-game-review';
import {CommunityGameReviewComment} from '../../../models/community/community-game-review-comment';
import {CommunityGameReviewService} from '../../../services/community/community-game-review.service';

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.scss']
})
export class ReviewsPageComponent implements OnInit, OnChanges {

  @Input() user: User;

  gameReviews: CommunityGameReview[];
  isReviewModal: boolean[];
  gameReviewComments: CommunityGameReviewComment[];

  currentPage: number;
  totalPage: number;
  totalReviews: number;

  arrowLeft: boolean;
  arrowRight: boolean;

  currentReview: number;

  reviewCommentInput: string;

  constructor(
    private service: CommunityGameReviewService,
  ) {
    this.user = new User();
    this.gameReviews = [];
    this.isReviewModal = [false];
  }

  ngOnInit(): void {
    this.service.getAllGameReviews().subscribe(async query => {
      this.gameReviews = query.data.communityGameReviews;
      this.resetModal();
    }, error => {
      console.log(error);
    });
  }

  openModal(reviewId: number): void {
    this.resetModal();
    this.service.getCommentsById(reviewId, this.currentPage).subscribe(async query => {
      this.gameReviewComments = query.data.getCommunityGameReviewCommentByReviewId;
      this.isReviewModal[reviewId] = true;
      this.currentReview = reviewId;
      this.loadContent();
    }, error => {
      console.log(error);
    });
  }


  loadContent = () => {
    this.service.getCommentsById(this.currentReview, this.currentPage).subscribe(async query => {
      this.gameReviewComments = query.data.getCommunityGameReviewCommentByReviewId;
      this.getTotalComments();
      this.updateControl();
    }, error => {
      console.log(error);
    });
  }

  getTotalComments = () => {
    this.service.getTotalComments(this.currentReview).subscribe(async query => {
      this.totalReviews = query.data.getTotalCommentByReviewId;
      this.totalPage = Math.ceil(this.totalReviews / 5);
      this.updateControl();
    });
  }

  helpful(id: number): void {
    this.service.helpful(id).subscribe(async query => {
      // this.updatePostLike();
    });
  }

  notHelpful(id: number): void {
    this.service.notHelpful(id).subscribe(async query => {
      // this.updatePostLike();
    });
  }

  resetModal(): void {
    this.currentPage = 1;
    this.totalPage = 1;
    this.arrowLeft = true;
    this.arrowRight = true;
  }

  updateControl(): void {
    if (this.currentPage <= 1) {
      this.arrowLeft = false;
    } else {
      this.arrowLeft = true;
    }
    if (this.currentPage >= this.totalPage) {
      this.arrowRight = false;
    } else {
      this.arrowRight = true;
    }
  }

  moveRight = () => {
    if (this.currentPage >= this.totalPage) {
      return;
    }
    this.currentPage++;
    this.loadContent();
  };

  moveLeft = () => {
    if (this.currentPage < this.totalPage) {
      return;
    }
    this.currentPage--;
    this.loadContent();
  }

  onSubmit(): void {
    this.service.addCommentByReviewId(this.currentReview, this.user.id, this.reviewCommentInput).subscribe(async query => {
      alert('Review submitted!');
    }, error => {
      console.log(error);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
