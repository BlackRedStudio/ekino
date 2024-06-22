import ProfileForm from "@/components/forms/profile-form";
import Section from "@/components/ui/section";
import { userActions } from "@/server/actions";

export default async function MyAccountPage() {

    const profile = await userActions.getProfile();

    if(!profile.success) {
        return false;
    }

    return (
        <Section>
            <ProfileForm user={profile.data} />
        </Section>
    )
}
