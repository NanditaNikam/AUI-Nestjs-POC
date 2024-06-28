import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class UpdateUserInputType {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => Int)
  age: number;
}
