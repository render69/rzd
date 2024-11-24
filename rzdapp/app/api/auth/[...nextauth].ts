import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import sqlite3 from "sqlite3";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const dbPath = path.resolve("./database.sqlite");
const db = new sqlite3.Database(dbPath);

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string } | undefined) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const query = "SELECT * FROM User WHERE email = ?";
        return new Promise<any>((resolve, reject) => {
          db.get(query, [credentials.email], async (err, row) => {
            if (err || !row) {
              reject("Invalid email or password");
            } else {
              const isValid = await bcrypt.compare(credentials.password, row.password);
              if (isValid) {
                resolve({ id: row.id.toString(), email: row.email, password: row.password });
              } else {
                reject("Invalid email or password");
              }
            }
          });
        });
      },
    }),
  ],
  session: {
    strategy: "jwt", // Используем строковое значение
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
export default handler;
