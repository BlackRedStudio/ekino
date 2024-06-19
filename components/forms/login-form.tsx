'use client'

import { signIn } from "next-auth/react"
import FormField from "../form-fields"
import { Button } from "../ui/button"
import Heading from "../ui/heading"
import SubmitButton from "../ui/submit-button"
import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function LoginForm() {

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const error = searchParams.get('error');

        if(error) {
            console.log(error);
            router.push('/logowanie');
        }

    }, [router, searchParams]);

    const handleGoogleSignIn = async () => {
        await signIn('google', {
            callbackUrl: '/'
        });
    }

    return (
        <div className="mx-auto grid w-[350px] gap-6">
            <Heading tag="h1" variant="h2" className="text-center">Logowanie</Heading>
            <form action="" className="space-y-1">
                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="mail@gmail.com"
                    required
                />
                <FormField
                    label="Hasło"
                    name="password"
                    type="password"
                    placeholder="*********"
                    required
                />
                <SubmitButton text="Zaloguj się" />
            </form>
            <Button variant={'outline'} className="w-full" onClick={handleGoogleSignIn}>
                Zaloguj się z Google
            </Button>
        </div>
    )
}
