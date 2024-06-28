import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserOutputType } from 'src/user/user-types/user.outputType';

@ObjectType()
export class PostOutputType {

  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  userId: number;

  @Field()
  Title: string;

  @Field()
  Description: string;

  @Field(() => UserOutputType, {nullable: true})
  createdBy: UserOutputType 

}
