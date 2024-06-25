import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User],)
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Mutation(() => User)
  createUser(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('age') age: number,
  ){
    const createUserDto = new CreateUserDto();
    createUserDto.firstName = firstName;
    createUserDto.lastName = lastName;
    createUserDto.age = age;
    return this.userService.create(createUserDto);
  }

}
