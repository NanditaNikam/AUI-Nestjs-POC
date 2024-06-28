import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostOutputType } from './post-types/post-outputType';
import { PostService } from './post.service';
import { PostInputType } from './post-types/post-inputType';
import { UpdatePostInputType } from './post-types/update-post-input';

@Resolver(() => PostOutputType)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [PostOutputType])
  async posts(): Promise<PostOutputType[]> {
    return this.postService.findAll();
  }

  @Query(() => PostOutputType)
  async post(
    @Args('id', { type: () => Int }) id: number,
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
    @Args('data') data: UpdatePostInputType,
  ): Promise<PostOutputType> {
    return this.postService.update(data.id, data);
  }

  @Mutation(() => Boolean)
  async removePost(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.postService.remove(id);
  }
}
