export interface CreateResult {
  id: number;
}

export interface VerifyTokenResult {
  email: string;
  sub: number;
  iat: number;
  exp: number;
}
