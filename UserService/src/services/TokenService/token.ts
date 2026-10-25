// Essential JWT types
interface JWTPayload {
  sub: string;          // Subject (user ID)
  email?: string;       // Optional email
  role: UserRole;       // User role
  iat: number;         // Issued at
  exp: number;         // Expiration time
}

enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export { type JWTPayload, UserRole, type TokenResponse }