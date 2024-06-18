import NextAuth from "next-auth"
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
  	providers: [],
})
