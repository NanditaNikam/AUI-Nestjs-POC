import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInputType } from './user-inputType';
import { UserOutputType } from './user.outputType';

@Resolver(() => UserOutputType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserOutputType])
  async users(): Promise<UserOutputType[]> {
    return this.userService.findAll();
  }

  @Mutation(() => UserOutputType)
  async createUser(@Args('data') data: UserInputType): Promise<UserOutputType> {
    return this.userService.create(data);
  }
}
