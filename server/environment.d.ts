declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: number | string;
    MYSQL_DATABASE?: string
    MYSQL_USER?: string
    MYSQL_PASSWORD?: string
    MYSQL_ROOT_PASSWORD?: string
  }
}