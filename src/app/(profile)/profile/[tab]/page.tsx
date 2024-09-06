import { Shell } from "@/components/shell";
import { CircleCard, ProfileHeader } from "../_components/profile-header";
import { Card } from "@/components/cards/card";

export default function Page () {
    return (
        <Shell>
        <ProfileHeader />
        <Card className="mt-10 w-full gap-2" title="Gallery">
          <div className="mt-3 flex gap-3">
            <CircleCard color="#ECB278" />
            <CircleCard color="#57A0C5" />
            <CircleCard color="#57A0C5" />
            <CircleCard color="#78B36E" />
            <CircleCard color="#57A0C5" />
          </div>
        </Card>
        <section className=""></section>
      </Shell>
    )
}