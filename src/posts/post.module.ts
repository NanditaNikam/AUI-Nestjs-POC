import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controllers';
import { Post } from './entity/posts.entity';
import { PostService } from './post.service';
import { PostResolver } from './post.resolvers';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [PostController],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
