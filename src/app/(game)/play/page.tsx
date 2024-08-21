import { fetchPropertyForDisplay } from '@/app/actions';
import GameSlider from '@/components/game-slider';
import { Shell } from '@/components/shell';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default async function Page() {
  return (
    <Shell className="py-[100px]">
      <div className="grid flex-1 grid-cols-3 gap-10">
        <div className="col-span-2 flex items-center gap-10">
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex size-[120px] items-center justify-center rounded-full border-[2.94px] border-primary-200 bg-primary px-[31px] py-10 shadow-time">
              <span className="font-heading text-[2.84569rem] font-bold">60</span>
            </div>

            <div className="flex size-[60px] items-center justify-center rounded-full bg-white text-primary-500">
              <span className="text-[16px]/[24px]">Map</span>
            </div>
          </div>

          <div className="flex w-[90%] flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-center gap-[18px]">
              <h1 className="text-[18px]/[23px] font-medium">Apartment</h1>
              <p className="text-[14px]/[17px] font-light">One bed luxury apartment,</p>
            </div>
            <GameSlider
              slides={siteConfig.gameData.images}
              // options={{ axis: 'y', align: 'start', dragFree: true, loop: true }}
            />
            {/* <div className="h-[337px] w-[432px] rounded-[20px] border border-border bg-black/[0.20] p-4">
              <Image
                src={'/images/Xcyan_property_NFT18_apartment.webp'}
                alt=""
                width={400}
                height={305}
                priority
                className="size-full rounded-[20px]"
              />
            </div> */}
          </div>
        </div>

        <div className="space-y-10 rounded-lg bg-card p-4">
          <div className="space-y-[18px]">
            <DescriptionList title="Size" description={'552 sqft / 51 sqm'} />

            <DescriptionList title="Bedrooms" description={3} />
            <DescriptionList title="Bathrooms" description={4} />
          </div>
          <div className="space-y-[18px]">
            <h1 className="text-[0.875rem] font-medium">Summary</h1>
            <p className="font-light">
              Private balcony. Communal roof terrace. Resident's concierge service. Close
              proximity to green spaces. 999 year lease with peppercorn ground rent
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

interface DescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: any;
}

const DescriptionList = ({ className, title, description }: DescriptionProps) => {
  return (
    <div className="flex items-center gap-1 font-sans text-[0.875rem]">
      <dt>{title}:</dt>
      <dd className={cn('font-light', className)}>{description}</dd>
    </div>
  );
};
