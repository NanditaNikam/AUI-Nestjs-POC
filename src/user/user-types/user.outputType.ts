import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostOutputType } from 'src/posts/post-types/post-outputType';

@ObjectType()
export class UserOutputType {

  @Field((type) => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field((type) => Int)
  age: number;

  @Field((type) => [PostOutputType], { nullable: true })
  posts?: PostOutputType[];
}
