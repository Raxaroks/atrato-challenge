import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from "./entities/user.entity";
import { AppConfiguration } from 'src/config';
import { CardsService } from 'src/cards/cards.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { formatDate } from 'src/common/helpers/date-functions';

@Injectable()
export class UsersService {
  private cache: User[];
  private db: string;

  constructor(private readonly cardsService: CardsService) {
    this.db = AppConfiguration().endpoints.usersDb;
    this.updateCache();
  }

  private updateCache(): void {
    try {
      this.cache = this.findAll();
    } catch (error) {
      console.warn(error);
      this.cache = [];
    }
  }

  private updateDB(data?: User[]) {
    if (!data) {
      this.updateCache();
      data = this.cache;
    }
    fs.writeFileSync(this.db, JSON.stringify(data));
  }

  async create({ birthday, ...rest }: CreateUserDto) {
    const id = uuid();
    const card = await this.cardsService.fetchRandom();
    const newUser: User = { 
      id, 
      birthday: birthday.toISOString(),
      cardInfo: card, 
      ...rest 
    };

    this.updateCache();
    this.cache.push(newUser);
    this.updateDB(this.cache);
    return 'User created'
  }

  findAll(): User[] {
    try {
      const raw = fs.readFileSync(this.db);
      const users: User[] = JSON.parse(raw.toString());
      return users;
    } catch (error) {
      console.warn(error);
      throw new InternalServerErrorException('Unable to retrieve data from source');
    }
  }

  findOne(id: string): User {
    const users = this.findAll();
    const found = users.find( usr => usr.id === id );
    if (!found) throw new NotFoundException(`There is not an user with the given ID: [${id}]`);
    return found;
  }

  update(id: string, { birthday, ...rest }: UpdateUserDto) {
    this.updateCache();
    const found = this.cache.find( usr => usr.id === id );
    if (!found) throw new NotFoundException(`There is not an user with the given ID: [${id}]`);  
    
    const index = this.cache.indexOf(found);
    const updated = { ...found, birthday: birthday.toISOString(), ...rest };
    this.cache[index] = updated;
    this.updateDB(this.cache);  
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'User updated',
      user: updated
    }
  }

  remove(id: string) {
    this.updateCache();
    const index = this.cache.findIndex( usr => usr.id === id );
    if (index < 0) throw new NotFoundException(`There is not an user with the given ID: [${id}]`);  
    this.cache.splice(index, 1);
    this.updateDB(this.cache);
  }
}
