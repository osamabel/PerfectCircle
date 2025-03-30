import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Extend the built-in session types
   */
  interface Session {
    user: {
      /** The user's ID from the database */
      id?: string
      /** The user's role from the database */
      role?: string
    } & DefaultSession["user"]
  }

  /**
   * Extend the built-in user type
   */
  interface User {
    /** The user's role from the database */
    role?: string
  }
}

declare module "next-auth/jwt" {
  /**
   * Extend the built-in JWT type
   */
  interface JWT {
    /** The user's ID from the database */
    id?: string
    /** The user's role from the database */
    role?: string
  }
}