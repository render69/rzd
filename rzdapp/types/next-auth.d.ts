// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        email: string;
    }
    const user: User = { id: row.id.toString(), email: row.email };
  interface Session {
    user: User;
  }
}
