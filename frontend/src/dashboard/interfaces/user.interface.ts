import { Card } from './card.interface';

export interface CreditUser {
  id?: string;
  email: string;
  phone: string;
  name: string;
  middleName?: string;
  fLastName: string;
  sLastName: string;
  birthday: Date;
  status: string;
  assignedAnalyst: string;
  cardInfo: Card;
}
