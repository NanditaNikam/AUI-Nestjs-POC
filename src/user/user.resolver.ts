import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInputType } from './user-inputType';
import { UserOutputType } from './user.outputType';
import { UpdateUserInputType } from './update-user-input';

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

  @Mutation(() => UserOutputType)
  async updateUser(
    @Args('data') data: UpdateUserInputType,
  ): Promise<UserOutputType> {
    return this.userService.update(data.id, data);
  }

  @Mutation(() => Boolean)
  async removeUser(
    @Args('id', { type: () => Number }) id: number,
  ): Promise<boolean> {
    return this.userService.remove(id);
  }
}
