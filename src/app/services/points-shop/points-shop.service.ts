import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {Query} from '../../models/query';

@Injectable({
  providedIn: 'root'
})
export class PointsShopService {

  constructor(
    private apollo: Apollo
  ) {
  }

  excludeProfileBackground(userId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: EXCLUDE_PROFILE_BACKGROUND,
      variables: {
        userId,
      },
    });
  }

  buyProfileBackground = (userId: number, id: number) => {
    return this.apollo.mutate({
      mutation: BUY_PROFILE_BACKGROUND,
      variables: {
        userId,
        id,
      }
    });
  }

  excludeAvatarFrame(userId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: EXCLUDE_AVATAR_FRAMES,
      variables: {
        userId,
      },
    });
  }

  buyAvatarFrame = (userId: number, id: number) => {
    return this.apollo.mutate({
      mutation: BUY_AVATAR_FRAME,
      variables: {
        userId,
        id,
      }
    });
  }

  excludeAnimatedAvatars(userId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: EXCLUDE_ANIMATED_AVATARS,
      variables: {
        userId,
      },
    });
  }

  buyAnimatedAvatar = (userId: number, id: number) => {
    return this.apollo.mutate({
      mutation: BUY_ANIMATED_AVATAR,
      variables: {
        userId,
        id,
      }
    });
  }

  excludeChatStickers(userId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: EXCLUDE_CHAT_STICKERS,
      variables: {
        userId,
      },
    });
  }

  buyChatSticker = (userId: number, id: number) => {
    return this.apollo.mutate({
      mutation: BUY_CHAT_STICKERS,
      variables: {
        userId,
        id,
      }
    });
  }

  excludeMiniProfileBackground(userId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: EXCLUDE_MINI_PROFILE_BACKGROUND,
      variables: {
        userId,
      },
    });
  }

  buyMiniProfileBackground = (userId: number, id: number) => {
    return this.apollo.mutate({
      mutation: BUY_MINI_PROFILE_BACKGROUND,
      variables: {
        userId,
        id,
      }
    });
  }
}

const EXCLUDE_PROFILE_BACKGROUND = gql`
  query excludeProfileBackground($userId:Int!) {
  excludeProfileBackground(userId:$userId){
    id
    name
    price
    link
  }
}
`;

const BUY_PROFILE_BACKGROUND = gql`
  mutation buyProfileBackground($userId:Int!, $id:Int!) {
    buyProfileBackground(userId:$userId, id:$id)
  }
`;

const EXCLUDE_AVATAR_FRAMES = gql`
  query excludeAvatarFrames($userId:Int!) {
  excludeAvatarFrames(userId:$userId){
    id
    name
    price
    link
  }
}
`;

const BUY_AVATAR_FRAME = gql`
  mutation buyAvatarFrame($userId:Int!, $id:Int!) {
    buyAvatarFrame(userId:$userId, id:$id)
  }
`;

const EXCLUDE_ANIMATED_AVATARS = gql`
  query excludeAnimatedAvatars($userId:Int!) {
  excludeAnimatedAvatars(userId:$userId){
    id
    name
    price
    link
  }
}
`;

const BUY_ANIMATED_AVATAR = gql`
  mutation buyAnimatedAvatars($userId:Int!, $id:Int!) {
    buyAnimatedAvatars(userId:$userId, id:$id)
  }
`;

const EXCLUDE_CHAT_STICKERS = gql`
  query excludeChatStickers($userId:Int!) {
  excludeChatStickers(userId:$userId){
    id
    name
    price
    link
  }
}
`;

const BUY_CHAT_STICKERS = gql`
  mutation buyChatSticker($userId:Int!, $id:Int!) {
    buyChatSticker(userId:$userId, id:$id)
  }
`;

const EXCLUDE_MINI_PROFILE_BACKGROUND = gql`
  query excludeMiniProfileBackgrounds($userId:Int!) {
  excludeMiniProfileBackgrounds(userId:$userId){
    id
    name
    price
    link
  }
}
`;

const BUY_MINI_PROFILE_BACKGROUND = gql`
  mutation buyMiniProfileBackground($userId:Int!, $id:Int!) {
    buyMiniProfileBackground(userId:$userId, id:$id)
  }
`;
