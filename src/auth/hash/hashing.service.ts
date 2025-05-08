// Classe abstrata apenas para servir como um tipo
export abstract class HashingServicePrococol {
    abstract hashPassword(password: string): Promise<string>;
    abstract comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}