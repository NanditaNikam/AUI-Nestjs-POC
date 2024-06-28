import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PostInputType {
  
  @Field()
  Title: string;

  @Field()
  Description: string;

  @Field((type) => Int)
  userId: number;
}
