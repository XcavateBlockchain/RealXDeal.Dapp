import Image from 'next/image';

type CardProps = {
  title: string;
  img?: string;
};

export const FeatureCard = ({ title, img }: CardProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="rounded-lg bg-primary-300/35 p-1 backdrop-blur">
        <div className="bg-primary p-6">
          <Image src={'/images/feature-img-1.png'} alt="" width={246} height={255} priority />
        </div>
      </div>
      <p className="sm:text-[1rem] text-center">{title}</p>
    </div>
  );
};
