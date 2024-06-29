import { Field, InputType, Int } from '@nestjs/graphql';
import { GraphQLLong } from 'graphql-scalars';

@InputType()
export class UpdatePostInputType {
  @Field(() => GraphQLLong)
  id: number;

  @Field()
  Title: string;

  @Field()
  Description: string;

  @Field(() => Int, { nullable: true })
  userId?: number;
}
