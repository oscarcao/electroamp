export const isDev = process.env.NODE_ENV === 'development'

// TODO: replace with a proper logger
export const logger = {
    log: (message: string) => console.log(message),
    error: (message: string) => console.error(message),
}
