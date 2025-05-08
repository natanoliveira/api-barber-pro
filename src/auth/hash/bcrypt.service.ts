import { HashingServicePrococol } from "./hashing.service";
import * as bcrypt from 'bcryptjs';

export class BcryptService extends HashingServicePrococol {
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}