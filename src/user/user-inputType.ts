import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInputType {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  age: number;
}
