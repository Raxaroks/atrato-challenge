import { Card } from 'src/cards/entities/card.entity'

export class User {
  id?: string;
  email: string;
  phone: string;
  name: string;
  middleName?: string;
  fLastName: string;
  sLastName: string;
  birthday: string; // yyyy-dd-mm
  status: string;
  assignedAnalyst: string;
  cardInfo: Card;
}
