import {Injectable} from '@angular/core';
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
  ) {
  }

  getAllGamesForPromo(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ALL_GAMES_FOR_PROMO,
    });
  }

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

  getAllPromos(): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_ALL_PROMOS
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
        developers: newGame.developers,
        publisherId: Number(newGame.publisherId),
        systemId: Number(newGame.systemId),
      }
    });
  }

  getGameById(id: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_GAME_BY_ID,
      variables: {
        id,
      }
    });
  }

  getGameByPromoId(id: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_GAME_BY_PROMO_ID,
      variables: {
        id,
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

  updateGameImage = (id: number[], images: InputGameImage[]) => {
    return this.apollo.mutate({
      mutation: UPDATE_GAME_IMAGE,
      variables: {
        id,
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

  updateGameVideo = (id: number[], videos: InputGameVideo[]) => {
    return this.apollo.mutate({
      mutation: UPDATE_GAME_VIDEO,
      variables: {
        id,
        videos,
      }
    });
  }

  updateGame = (id: number, game: InputGame) => {
    return this.apollo.mutate({
      mutation: UPDATE_GAME_MUTATION,
      variables: {
        id,
        input: game,
      }
    });
  }

  setGamePromo = (gameId: number, promoId: number) => {
    return this.apollo.mutate({
      mutation: SET_GAME_PROMO,
      variables: {
        gameId,
        promoId,
      }
    });
  }

}

const GET_ALL_GAMES_FOR_PROMO = gql`
  query getAllGames{
    games{
      id
      name
    }
  }
`;

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

const GET_ALL_PROMOS = gql`
  query getAllPromos {
    promos {
      id
      discountPercentage
      validUntil
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

const GET_GAME_BY_ID = gql`
  query getGameById($id:Int!) {
    gameById(id:$id) {
      id
      name
      description
      genres {
        id
      }
      tags {
        id
      }
      originalPrice
      promo {
        id
      }
      developers {
        id
      }
      publisher {
        id
      }
      system {
        id
      }
      banner
      video {
        id
        link
      }
      images {
        id
        link
      }
    }
  }
`;

const GET_GAME_BY_PROMO_ID = gql`
  query getGameByPromoId($id:Int!) {
    getGameByPromoId(id:$id){
      id
      name
    }
  }
`;

const CREATE_GAME_MUTATION = gql`
  mutation createGame($name:String!, $description:String!, $genres:[InputGenre!]!, $tags:[InputTag!]!,
  $originalPrice:Float!, $promo:InputPromo!, $developers:[InputDeveloper!]!,
  $publisherId:Int!, $systemId:Int!) {
    createGame(input:{name:$name, description:$description, genres:$genres, tags:$tags,
    originalPrice:$originalPrice, promo:$promo,
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

const UPDATE_GAME_IMAGE = gql`
  mutation updateGameImage($id:[Int!]!, $images:[InputGameImage!]!) {
    updateGameImage(id:$id,images:$images)
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

const UPDATE_GAME_VIDEO = gql`
  mutation updateGameVideo($id:[Int!]!, $videos:[InputGameVideo!]!) {
    updateGameVideo(id:$id,videos:$videos)
  }
`;

const UPDATE_GAME_MUTATION = gql`
  mutation updateGame($id:Int!, $input:NewGame!) {
    updateGame(id:$id, input:$input) {
      id
      name
    }
  }
`;

const SET_GAME_PROMO = gql`
  mutation setGamePromo($gameId:Int!, $promoId:Int!) {
    setGamePromo(gameId:$gameId,promoId:$promoId) {
      id
      name
    }
  }
`;
