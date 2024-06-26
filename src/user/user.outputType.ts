import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserOutputType {

  @Field((type) => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field((type) => Int)
  age: number;
}
