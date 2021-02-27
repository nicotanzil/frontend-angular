import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Query} from '../../models/query';
import {Observable} from 'rxjs';
import {Game} from '../../models/game';
import {InputGame} from '../../models/input/input-game';
import {InputGameImage} from '../../models/input/input-game-image';
import {InputGameVideo} from '../../models/input/input-game-video';

@Injectable({
  providedIn: 'root'
})
export class AdminGamesService {

  constructor(
    private apollo: Apollo
  ) { }

  getGamesPagination(page): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_GAMES_PAGINATION,
      variables: {
        page,
      },
    });
  }

  getAllGenres(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ALL_GENRES
    });
  }

  getAllTags(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ALL_TAGS
    });
  }

  getAllDevelopers(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ALL_DEVELOPERS
    });
  }

  getAllPublishers(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ALL_PUBLISHERS
    });
  }

  getAllSystems(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ALL_SYSTEMS
    });
  }

  createGame = (newGame: InputGame) => {
    return this.apollo.mutate({
      mutation: CREATE_GAME_MUTATION,
      variables: {
        name: newGame.name,
        description: newGame.description,
        genres: newGame.genres,
        tags: newGame.tags,
        originalPrice: newGame.originalPrice,
        onSale: newGame.onSale,
        discountPercentage: newGame.discountPercentage,
        developers: newGame.developers,
        publisherId: Number(newGame.publisher),
        systemId: Number(newGame.system),
      }
    });
  }

  getTotalGame(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_TOTAL_GAME,
    });
  }

  removeGame = (id: number) => {
    return this.apollo.mutate({
      mutation: REMOVE_GAME,
      variables: {
        id
      }
    });
  }

  insertGameImage = (images: InputGameImage[]) => {
    return this.apollo.mutate({
      mutation: INSERT_GAME_IMAGE,
      variables: {
        images,
      }
    });
  }

  insertGameBanner = (id: number, link: string) => {
    return this.apollo.mutate({
      mutation: INSERT_GAME_BANNER,
      variables: {
        id,
        link,
      }
    });
  }

  insertGameVideo = (videos: InputGameVideo[]) => {
    return this.apollo.mutate({
      mutation: INSERT_GAME_VIDEO,
      variables: {
        videos,
      }
    });
  }
}

const GET_GAMES_PAGINATION = gql`
  query getGamesPagination($page:Int) {
    getGamePaginationAdmin(page:$page) {
      id
      name
      originalPrice
      banner
    }
  }
`;

const GET_ALL_GENRES = gql`
  query getAllGenres {
    genres {
      id
      name
    }
  }
`;

const GET_ALL_TAGS = gql`
  query getAllTags {
    tags {
      id
      name
    }
  }
`;

const GET_ALL_DEVELOPERS = gql`
  query getAllDevelopers {
    developers {
      id
      name
    }
  }
`;

const GET_ALL_PUBLISHERS = gql`
  query getAllPublishers {
    publishers {
      id
      name
    }
  }
`;

const GET_ALL_SYSTEMS = gql`
  query getAllSystems {
    systems {
      id
      os
      memory
      graphics
      storage
    }
  }
`;

const CREATE_GAME_MUTATION = gql`
  mutation createGame($name:String!, $description:String!, $genres:[InputGenre!]!, $tags:[InputTag!]!,
  $originalPrice:Float!, $onSale:Boolean!, $discountPercentage:Int!, $developers:[InputDeveloper!]!,
  $publisherId:Int!, $systemId:Int!) {
    createGame(input:{name:$name, description:$description, genres:$genres, tags:$tags,
    originalPrice:$originalPrice, onSale:$onSale, discountPercentage:$discountPercentage,
    developers:$developers, publisherId:$publisherId, systemId:$systemId}){
      id
      name
    }
  }
`;

const GET_TOTAL_GAME = gql`
  query getTotalGame {
    getTotalGame
  }
`;

const REMOVE_GAME = gql`
  mutation deleteGame($id:Int!) {
    deleteGame(id:$id) {
      id
      name
    }
  }
`;

const INSERT_GAME_IMAGE = gql`
  mutation insertGameImage($images:[InputGameImage!]!) {
    insertGameImage(gameImages:$images)
  }
`;

const INSERT_GAME_BANNER = gql`
  mutation insertGameBanner($id:Int!, $link:String!) {
    insertGameBanner(id:$id, link:$link)
  }
`;

const INSERT_GAME_VIDEO = gql`
  mutation insertGameVideo($videos:[InputGameVideo!]!) {
    insertGameVideo(gameVideos:$videos)
  }
`;
