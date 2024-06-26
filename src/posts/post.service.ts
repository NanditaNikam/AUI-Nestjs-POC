import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entity/posts.entity';
import { PostInputType } from './post-types/post-inputType';
import { User } from 'src/user/entities/user.entity';
import { PostOutputType } from './post-types/post-outputType';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,

    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(data: PostInputType): Promise<Post> {
    const user = await this.userRepository.findOne({
      where: { id: data.userId },
    });
    const post = this.postRepository.create({ ...data, user });
    const createdPost = await this.postRepository.save(post);
    return { ...createdPost, createdBy: user };
  }

  async findAll(): Promise<PostOutputType[]> {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOne({ where: { id } });
  }

  async update(id: number, data: PostInputType): Promise<Post> {
    await this.postRepository.update(id, data);
    return this.postRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.postRepository.delete(id);
    return result.affected > 0;
  }

  async getPostByUserId(userId: number): Promise<PostOutputType[]> {
    const posts = await this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    return posts.map((post) => ({
      id: post.id,
      userId: post.user.id,
      Title: post.Title,
      Description: post.Description,
      createdBy: {
        id: post.user.id,
        firstName: post.user.firstName,
        lastName: post.user.lastName,
        age: post.user.age,
        posts: [],
      },
    }));
  }
}
