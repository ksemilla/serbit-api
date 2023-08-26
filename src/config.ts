const DEVELOPMENT = 'development';

export default () => {
  const NODE_ENV = process.env.NODE_ENV ?? DEVELOPMENT;

  return NODE_ENV === DEVELOPMENT
    ? {
        APP_KEY: 'serbit',
        DB_HOST: 'postgres',
        DB_PORT: 5432,
        DB_USERNAME: 'serbit',
        DB_PASSWORD: 'serbit',
        DB_DATABASE_NAME: 'serbit',
        NODE_ENV,
        SALT_ROUNDS: 10,
        FRONT_END_URL: 'http://localhost:5173',
      }
    : {
        APP_KEY: process.env.APP_KEY,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_DATABASE_NAME: process.env.DB_DATABASE_NAME,
        SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
        NODE_ENV,
        FRONT_END_URL: process.env.FRONT_END_URL,
      };
};
