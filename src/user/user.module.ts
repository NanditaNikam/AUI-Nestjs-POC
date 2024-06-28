import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { Post } from 'src/posts/entity/posts.entity';
import { DynamooseModule } from 'nestjs-dynamoose';
import { userSchema, userTableName } from './ddb/user-ddb.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    DynamooseModule.forFeature([
      {
        name: userTableName,
        schema: userSchema,
      },
    ]),
  ],

  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
