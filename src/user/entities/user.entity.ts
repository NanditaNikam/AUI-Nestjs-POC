import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column() 
  firstName: string;

  @Field()
  @Column() 
  lastName: string;

  @Field()
  @Column() 
  age: number;
}
