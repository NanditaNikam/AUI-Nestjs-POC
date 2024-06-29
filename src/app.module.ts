import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostModule } from './posts/post.module';
import { DynamooseModule } from 'nestjs-dynamoose';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Nandu0707@!',
      database: 'AUI-Database',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      // logging: true,
      synchronize: true,
    }),
    DynamooseModule.forRoot({
      aws: {
        region: 'us-east-1',
      },
      local: false,
      table: {
        create: true,
        prefix: 'Nandita-Onboarding',
      },
    }),
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
