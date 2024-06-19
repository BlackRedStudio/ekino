import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import {DrizzleAdapter} from '@auth/drizzle-adapter'
import { db } from "./db";
import {accountsTable, usersTable, sessionsTable, verificationTokensTable} from '../db/schemas'

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db, {
		accountsTable,
		usersTable,
		sessionsTable,
		verificationTokensTable,
	}),
  	providers: [
		Google({
			allowDangerousEmailAccountLinking: true
		}),
		Credentials({
			credentials: {
				email: {},
				password: {}
			},
			authorize: async credentials => {
				try {
					throw new Error('test');
				} catch (error) {
					console.log(error);
					return null;
				}
			}
		}),
	],
	pages: {
		signIn: '/logowanie',
		signOut: '/logowanie',
		error: '/logowanie',
	}
})
