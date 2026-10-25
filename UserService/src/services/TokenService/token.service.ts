import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { type User } from '../../entities/User.js'
import { type JWTPayload } from './token.js'

dotenv.config();

class TokenService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET!;
  private static readonly REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

  static generateAccessToken(user: User): string {
    const payload: JWTPayload = {
      sub: user.uuid,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
    };

    return jwt.sign(payload, this.JWT_SECRET);
  }

  static generateRefreshToken(userId: string): string {
    return jwt.sign(
      { sub: userId },
      this.REFRESH_SECRET,
      { expiresIn: '7d' }
    );
  }
}

export { TokenService }