import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {NewGift} from '../../models/transaction/new-gift';
import {Observable} from 'rxjs';
import {Query} from '../../models/query';
import {InputHeaderTransaction} from '../../models/transaction/input-header-transaction';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private apollo: Apollo
  ) {
  }

  createGift = (gift: NewGift) => {
    return this.apollo.mutate({
      mutation: CREATE_GIFT,
      variables: {
        gift
      }
    });
  };

  paymentTypes(): Observable<Query> {
    return this.apollo.query<Query>({
      query: PAYMENT_TYPES,
    });
  }

  getGiftBySenderId(id: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_GIFT_BY_SENDER_ID,
      variables: {
        id,
      }
    });
  }

  createTransaction = (transaction: InputHeaderTransaction) => {
    return this.apollo.mutate({
      mutation: CREATE_TRANSACTION,
      variables: {
        transaction,
      }
    });
  }

  getGiftNotificationCount(receiverId: number): Observable<Query> {
    return this.apollo.query<Query>({
      query: GET_GIFT_NOTIFICATION_COUNT,
      variables: {
        receiverId,
      }
    });
  }
}

const CREATE_GIFT = gql`
  mutation createGift($gift:NewGift!) {
    createGift(gift:$gift)
  }
`;

const PAYMENT_TYPES = gql`
  query paymentTypes {
    paymentTypes {
      id
      name
    }
  }
`;

const GET_GIFT_BY_SENDER_ID = gql`
  query getGiftBySenderId($id:Int!) {
    getGiftBySenderId(id:$id) {
      id
      sender {
        id
        accountName
      }
      receiver {
        id
        accountName
      }
      firstName
      message
      sentiment
      signature
      isComplete
      isOpen
    }
  }
`;

const CREATE_TRANSACTION = gql`
  mutation createTransaction($transaction:InputTransactionHeader!) {
    createTransaction(transaction:$transaction)
  }
`;

const GET_GIFT_NOTIFICATION_COUNT = gql`
  query getGiftNotificationCount($receiverId:Int!) {
    getGiftNotificationCount(receiverId:$receiverId)
  }
`;
