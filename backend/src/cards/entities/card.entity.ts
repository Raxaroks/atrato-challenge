
export class Card {
  number: string;
  type: string;
  cvv: string;
  pin: string;
  expiration: string;
}

export interface RandommerCard {
  type: string;
  date: string;
  fullName: string;
  cardNumber: string;
  cvv: string;
  pin: number;
}
