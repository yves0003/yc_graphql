declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string
    DATABASE_NAME: string
    DATA_EVENTS: string
    DATA_COURS: string
    DATA_COURSBYDATE: string
    DATA_USERS: string
  }
}