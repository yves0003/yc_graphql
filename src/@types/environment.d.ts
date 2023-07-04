declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string
    DATABASE_NAME: string
    DATA_EVENTS: string
    DATA_COURS: string
    DATA_COURSBYDATE: string
    DATA_USERS: string
    DATA_ADMINUSERS: string
    ISSUER_JWT: string
    ACCESS_TOKEN_SECRET: string
    REFRESH_TOKEN_SECRET: string
    SENDINBLUE_API_KEY: string
    SERVER_PORT: string
  }
}
