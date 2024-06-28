import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserInputType } from '../user/user-types/user-inputType';
import { Post } from 'src/posts/entity/posts.entity';
import { UserOutputType } from './user-types/user.outputType';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { UserDdb, UserDdbKey, userTableName } from './ddb/user-ddb.schema';
import { UpdateUserInputType } from './user-types/update-user-input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectModel(userTableName)
    private readonly userDdbModel: Model<UserDdb, UserDdbKey>,
  ) {}

  async create(data: UserInputType): Promise<UserOutputType> {
    return this.userDdbModel.create({
      ...data,
      id: new Date().getTime(),
    });
  }

  async findAll(): Promise<UserOutputType[]> {
    const users = await this.userDdbModel.scan().exec();
    return users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
    }));
  }

  async findOne(id: number): Promise<UserOutputType> {
    const user = await this.userDdbModel.get({ id: Number(id) });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
    };
  }

  async update(id: number, data: UpdateUserInputType): Promise<UserOutputType> {
    const user = await this.userDdbModel.get({ id: Number(id) });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    const updatedUser = await this.userDdbModel.update(
      { id: Number(id) },
      {
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
      },
    );
    return {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      age: updatedUser.age,
    };
  }


  async remove(id: number): Promise<boolean> {
    try {
      await this.userDdbModel.delete({ id: Number(id) });
      return true;
    } catch (error) {
      console.log(`Error removing ${id}`, error);
      return false;
    }
  }

  async getUserWithPosts(id: number): Promise<UserOutputType> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['posts', 'posts.user'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      posts: user.posts.map((post) => ({
        id: post.user.id,
        userId: post.user.id,
        Title: post.Title,
        Description: post.Description,
        createdBy: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
        },
      })),
    };
  }
}
