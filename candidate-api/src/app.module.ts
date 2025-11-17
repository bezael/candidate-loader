import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CandidatesModule } from './candidates/candidates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CandidatesModule,
  ],
})
export class AppModule {}
