import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostOutputType } from './post-types/post-outputType';
import { PostService } from './post.service';
import { PostInputType } from './post-types/post-inputType';
import { UpdatePostInputType } from './post-types/update-post-input';
import { GraphQLLong } from 'graphql-scalars';

@Resolver(() => PostOutputType)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [PostOutputType])
  async posts(): Promise<PostOutputType[]> {
    return this.postService.findAll();
  }

  @Query(() => PostOutputType)
  async post(
    @Args('id', { type: () => GraphQLLong }) id: number,
  ): Promise<PostOutputType> {
    return this.postService.findOne(id);
  }

  @Query(() => [PostOutputType])
  async getPostByUserId(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<PostOutputType[]> {
    return this.postService.getPostByUserId(userId);
  }

  @Mutation(() => PostOutputType)
  async createPost(@Args('data') data: PostInputType): Promise<PostOutputType> {
    return this.postService.create(data);
  }

  @Mutation(() => PostOutputType)
  async updatePost(
    @Args('id', { type: () => GraphQLLong }) id: number,
    @Args('data') data: UpdatePostInputType,
  ): Promise<PostOutputType> {
    return this.postService.update(id, data);
  }

  @Mutation(() => Boolean)
  async removePost(
    @Args('id', { type: () => GraphQLLong }) id: number,
  ): Promise<boolean> {
    try {
      await this.postService.remove(id);
      return true;
    } catch (error) {
      console.log('Error in removing post', error);
      return false;
    }
  }
}
