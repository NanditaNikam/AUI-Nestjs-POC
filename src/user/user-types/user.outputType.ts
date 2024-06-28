import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLLong } from 'graphql-scalars';
import { PostOutputType } from 'src/posts/post-types/post-outputType';

@ObjectType()
export class UserOutputType {

  @Field(() => GraphQLLong)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => Int)
  age: number;

  @Field((type) => [PostOutputType], { nullable: true })
  posts?: PostOutputType[];
}
