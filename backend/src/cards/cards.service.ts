import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Card, RandommerCard } from './entities/card.entity';
import { AppConfiguration } from 'src/config';


@Injectable()
export class CardsService {
  private readonly randommerAPI = {
    endpoint: AppConfiguration().endpoints.randommerApi || '',
    key: AppConfiguration().keys.xApi || ''
  };
  
  constructor(
    private readonly http: AxiosAdapter
  ) {}

  async fetchRandom(): Promise<Card> {
    const options = { headers: {'X-Api-Key': this.randommerAPI.key} };
    const { fullName, ...rest } = await this.http.get<RandommerCard>(this.randommerAPI.endpoint, options);
    return {
      number: rest.cardNumber,
      type: rest.type,
      cvv: rest.cvv,
      pin: rest.pin.toString(),
      expiration: rest.date,
    };
  }

}
