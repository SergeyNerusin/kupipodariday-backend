export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3001,
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'student',
    password: process.env.DB_PASSWORD || 'student',
    name: process.env.DB_NAME || 'kupipodariday',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'crypto-stroka',
    ttl: process.env.JWT_EXP || '28800s',
  },
});
