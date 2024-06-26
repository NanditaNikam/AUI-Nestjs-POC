import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserInputType {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field((type) => Int)
  age: number;
}
