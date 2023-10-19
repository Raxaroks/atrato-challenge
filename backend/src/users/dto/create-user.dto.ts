import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly middleName: string;

  @IsString()
  readonly fLastName: string;

  @IsString()
  readonly sLastName: string;

  @IsDate()
  readonly birthday: Date;

  @IsString()
  readonly status: string;

  @IsString()
  readonly assignedAnalyst: string;
}
