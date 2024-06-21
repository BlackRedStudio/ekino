import { db } from "@/server/providers/db"
import { eq, or } from "drizzle-orm";
import { usersTable } from "../schemas";

const UserRepository = {

    async firstByEmail(email: string) {
        const user = await db.query.usersTable.findFirst({
            where: eq(usersTable.email, email)
        });

        return user;
    },
    async isExist(email: string, name: string) {
        const user = await db.query.usersTable.findFirst({
            where: or(eq(usersTable.email, email), eq(usersTable.name, name)),
        });

        return !!user;
    },
    async insert(email: string, name: string, password: string) {
        await db.insert(usersTable).values({
            name,
            email,
            password
        });
    }
}

export default UserRepository;
