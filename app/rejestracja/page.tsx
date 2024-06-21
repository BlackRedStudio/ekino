'use client'

import FormField from "@/components/form-fields"
import SubmitButton from "@/components/ui/submit-button"
import { test } from "@/server/actions/user-actions"


export default function RegisterPage() {
    return (
        <article>
            <section>
                <form action={test}>
                    <FormField
                       label="Test"
                       name="test"
                       type="text"
                       placeholder="test akcji serverowej"
                       required
                   />
                   <SubmitButton text="Wyślij" />
                </form>
            </section>
        </article>
    )
}
