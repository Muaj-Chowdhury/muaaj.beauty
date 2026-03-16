import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise, { getCollection } from "./mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        const usersCollection = await getCollection("users");

        const user = await usersCollection.findOne({ email });

        if (!user) throw new Error("No user found with this email.");
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) throw new Error("Invalid password.");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const usersCollection = await getCollection("users");
        const existingUser = await usersCollection.findOne({
          email: user.email,
        });
        if (!existingUser) {
          await usersCollection.insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
            provider: "google",
            createdAt: new Date(),
          });
        }
      }
      return true;
    },

    async jwt({token, user, trigger, session }){
        // Pass data from user to token
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
      }
      return token;
    },

    async session({session, token}){
        // Pass data from token to session
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },

  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
