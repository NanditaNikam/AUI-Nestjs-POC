import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controllers';
import { Post } from './entity/posts.entity';
import { PostService } from './post.service';
import { PostResolver } from './post.resolvers';
import { User } from 'src/user/entities/user.entity';
import { DynamooseModule } from 'nestjs-dynamoose';
import { postSchema, postTableName } from 'src/posts/ddb/posts-ddb-schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    DynamooseModule.forFeature([
      {
        name: postTableName,
        schema: postSchema,
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
