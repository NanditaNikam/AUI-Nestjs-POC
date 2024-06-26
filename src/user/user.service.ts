import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserInputType } from '../user/user-types/user-inputType';
import { Post } from 'src/posts/entity/posts.entity';
import { UserOutputType } from './user-types/user.outputType';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async create(data: UserInputType): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, data: UserInputType): Promise<User> {
    await this.userRepository.update(id, data);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
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
