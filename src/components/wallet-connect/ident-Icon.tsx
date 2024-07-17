import Image from 'next/image';

export default function IdentIcon({ address }: { address: string }) {
  return (
    <div className="flex items-center gap-[17px]">
      <Image
        src={'/images/profile.jpeg'}
        alt="profile"
        width={53}
        height={53}
        className="rounded-full border-4 border-primary-400 shadow-profile"
        priority
      />
      <div>
        <span className="rounded-3xl bg-[#DC7DA6]/[0.25] px-2 py-[2px] text-[0.875rem]/[0.025rem] font-extralight">
          {address}
        </span>
      </div>
    </div>
  );
}
