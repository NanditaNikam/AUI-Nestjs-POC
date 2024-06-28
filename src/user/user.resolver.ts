import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInputType } from '../user/user-types/user-inputType';
import { UserOutputType } from '../user/user-types/user.outputType';
import { UpdateUserInputType } from '../user/user-types/update-user-input';

@Resolver(() => UserOutputType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserOutputType])
  async users(): Promise<UserOutputType[]> {
    return this.userService.findAll();
  }

  @Query(() => UserOutputType, { name: 'user' })
  async user(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserOutputType> {
    return this.userService.findOne(id);
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
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    try {
      await this.userService.remove(id);
      return true;
    } catch (error) {
      console.log('Error in removing user id');
      return false;
    }
  }


  @Query(() => UserOutputType)
  async getUserWithPosts(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserOutputType> {
    return this.userService.getUserWithPosts(id);
  }
}
