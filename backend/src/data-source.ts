import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

// Initialize configuration
ConfigModule.forRoot({
  isGlobal: true,
});

// When running migrations from host (outside Docker), use localhost
// When running inside Docker container, use 'postgres' service name
const isDocker = process.env.RUNNING_IN_DOCKER === 'true';
const databaseHost = isDocker ? 'postgres' : 'localhost';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || databaseHost,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER || 'admin',
  password: process.env.DATABASE_PASSWORD || 'admin123',
  database: process.env.DATABASE_NAME || 'boilerplate_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
});
