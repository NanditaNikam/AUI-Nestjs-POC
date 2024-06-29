import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLLong } from 'graphql-scalars';
import { UserOutputType } from 'src/user/user-types/user.outputType';

@ObjectType()
export class PostOutputType {
  @Field(() => GraphQLLong)
  id: number;

  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field()
  Title: string;

  @Field()
  Description: string;

  @Field(() => UserOutputType, { nullable: true })
  createdBy?: UserOutputType;
}
