import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePostInputType {
  @Field((type) => Int)
  id: number;

  @Field()
  Title: string;

  @Field()
  Description: string;

  @Field((type) => Int)
  userId : number;

}
