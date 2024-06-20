import NextAuth from "next-auth"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import {DrizzleAdapter} from '@auth/drizzle-adapter'
import { db } from "./db";
import {accountsTable, usersTable, sessionsTable, verificationTokensTable} from '../db/schemas'
import { eq } from "drizzle-orm";

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
			authorize: async ({email, password}) => {
				try {

					if(typeof email !== 'string' || typeof password !== 'string') {
						throw new Error('Złe dane logowania');
					}

					const user = await db.query.usersTable.findFirst({
						where: eq(usersTable.email, email)
					});

					if(!user || !user.password) {
						throw new Error('Złe dane logowania');
					}

					const passwordMatch = await bcrypt.compare(
						password,
						user.password
					);

					if(!passwordMatch) {
						throw new Error('Złe dane logowania');
					}

					return user;
				} catch (error) {
					console.log(error);
					return null;
				}
			}
		}),
	],
	events: {
		signIn(msg) {
			console.log(msg);
		},
	},
	pages: {
		signIn: '/logowanie',
		signOut: '/logowanie',
		error: '/logowanie',
	},
	session: {
		strategy: 'jwt'
	}
})
