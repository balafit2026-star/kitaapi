import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";
import { PoolConfig } from "mariadb";
// import "dotenv/config";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      adapter: new PrismaMariaDb(createMariaDbPoolConfig()),
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Database connected successfully');
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      throw error;
    }
  }
  
  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }
}

function createMariaDbPoolConfig(): PoolConfig {
  // const databaseUrl = process.env.DATABASE_URL
  //   ? new URL(process.env.DATABASE_URL)
  //   : undefined;
const databaseUrl="mysql://u258460312_kita_user:Sbva%2Ftech1@localhost:3306/u258460312_kita";
  const config: PoolConfig = {
    host: "localhost",
    // process.env.DATABASE_HOST ?? databaseUrl?.hostname,
    user: "u258460312_kita_user",
    //process.env.DATABASE_USER ?? decodeURIComponent(databaseUrl?.username ?? ''),
    password:"Sbva/tech1",
      // process.env.DATABASE_PASSWORD ??
      // decodeURIComponent(databaseUrl?.password ?? ''),
    database:"u258460312_kita",
      // process.env.DATABASE_NAME ??
      // decodeURIComponent(databaseUrl?.pathname.slice(1) ?? ''),
  };

  // Validate required fields
  if (!config.host) throw new Error('DATABASE_HOST is not defined');
  if (!config.user) throw new Error('DATABASE_USER is not defined');
  if (!config.database) throw new Error('DATABASE_NAME is not defined');

  // Convert port with validation
  const port = 3306;
  //Number(process.env.DATABASE_PORT ?? databaseUrl?.port ?? 3306);
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error('DATABASE_PORT must be a valid port number');
  }
  config.port = port;

  // Optional: Add connection pool settings
  config.connectionLimit = parseInt(process.env.DATABASE_POOL_SIZE || '10', 10);
  config.acquireTimeout = parseInt(process.env.DATABASE_TIMEOUT || '10000', 10);

  return config;
}
