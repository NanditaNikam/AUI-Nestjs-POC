import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInputType {
  @Field((type) => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field((type) => Int)
  age: number;
}
