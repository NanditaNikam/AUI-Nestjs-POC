import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entity/posts.entity';
import { PostInputType } from './post-types/post-inputType';
import { User } from 'src/user/entities/user.entity';
import { PostOutputType } from './post-types/post-outputType';
import { PostDdb, PostDdbKey, postTableName } from './ddb/posts-ddb-schema';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { UpdatePostInputType } from './post-types/update-post-input';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectModel(postTableName)
    private readonly postDdbModel: Model<PostDdb, PostDdbKey>,
  ) {}

  async create(data: PostInputType): Promise<PostOutputType> {
    return this.postDdbModel.create({
      ...data,
      id: new Date().getTime(),
    });
  }

  async findAll(): Promise<PostOutputType[]> {
    const posts = await this.postDdbModel.scan().exec();
    return posts.map((post) => ({
      id: post.id,
      Title: post.Title,
      Description: post.Description,
    }));
  }

  async findOne(id: number): Promise<PostOutputType> {
    const post = await this.postDdbModel.get({ id: Number(id) });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return {
      id: post.id,
      Title: post.Title,
      Description: post.Description,
    };
  }


  async update(id: number, data: UpdatePostInputType): Promise<PostOutputType> {
    const post = await this.postDdbModel.get({ id: Number(id) });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    const updatedPost = await this.postDdbModel.update(
      { id: Number(id) },
      {
        Title: data.Title,
        Description: data.Description,
      },
    );
    return {
      id: updatedPost.id,
      Title: updatedPost.Title,
      Description: updatedPost.Description,
    };
  }


  async remove(id: number): Promise<boolean> {
    try {
      await this.postDdbModel.delete({ id: Number(id) });
      return true;
    } catch (error) {
      console.log(`Error removing ${id}`, error);
      return false;
    }
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
