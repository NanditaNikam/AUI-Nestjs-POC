import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PostInputType {
  @Field()
  Title: string;

  @Field()
  Description: string;

  @Field(() => Int, { nullable: true })
  userId?: number;
}
