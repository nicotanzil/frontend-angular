import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommunityArtworkService} from '../../../services/community/community-artwork.service';
import {User} from '../../../models/user';
import {CommunityArtPost} from '../../../models/community/community-art-post';
import {async} from 'rxjs';
import {CommunityArtPostReview} from '../../../models/community/community-art-post-review';

@Component({
  selector: 'app-artwork-page',
  templateUrl: './artwork-page.component.html',
  styleUrls: ['./artwork-page.component.scss']
})
export class ArtworkPageComponent implements OnInit, OnChanges {

  @Input() user: User;

  artworkPosts: CommunityArtPost[];
  postLike: number[];
  isModal: boolean[];
  reviews: CommunityArtPostReview[];

  currentPage: number;
  totalPage: number;
  totalComments: number;

  arrowLeft: boolean;
  arrowRight: boolean;

  currentPost: number;

  reviewInput: string;

  constructor(
    private service: CommunityArtworkService
  ) {
    this.user = new User();
    this.artworkPosts = [];
    this.postLike = [];
    this.isModal = [false];
  }

  ngOnInit(): void {
    this.service.getAllCommunityArtworks().subscribe(async query => {
      this.artworkPosts = query.data.communityArtPosts;
      this.updatePostLike();
      this.resetModal();
    }, error => {
      console.log(error);
    });
  }

  openModal(postId: number): void {
    this.resetModal();
    this.service.getCommentsById(postId, this.currentPage).subscribe(async query => {
      this.reviews = query.data.getCommunityArtPostReviewsByPostId;
      this.isModal[postId] = true;
      this.currentPost = postId;
      this.loadContent();
    }, error => {
      console.log(error);
    });
  }

  loadContent = () => {
    this.service.getCommentsById(this.currentPost, this.currentPage).subscribe(async query => {
      this.reviews = query.data.getCommunityArtPostReviewsByPostId;
      this.getTotalReviews();
      this.updateControl();
    }, error => {
      console.log(error);
    });
  };

  getTotalReviews = () => {
    this.service.getTotalReviews(this.currentPost).subscribe(async query => {
      this.totalComments = query.data.getTotalReviewsByPostId;
      this.totalPage = Math.ceil(this.totalComments / 5);
      this.updateControl();
    });
  };

  like(id: number): void {
    this.service.like(id).subscribe(async query => {
      this.updatePostLike();
    });
  }

  dislike(id: number): void {
    this.service.dislike(id).subscribe(async query => {
      this.updatePostLike();
    });
  }

  updatePostLike(): void {
    this.artworkPosts.forEach(post => {
      this.postLike[post.id] = post.like;
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
  }

  moveLeft = () => {
    if (this.currentPage < this.totalPage) {
      return;
    }
    this.currentPage--;
    this.loadContent();
  }

  onSubmit(): void {
    this.service.addCommentByPostId(this.currentPost, this.user.id, this.reviewInput).subscribe(async query => {
      alert('Review submitted!');
    }, error => {
      console.log(error);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
