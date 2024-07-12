import { team } from '@/config/team';
import Image from 'next/image';

type CardProps = {
  name: string;
  title: string;
  img: string;
};

export function TeamSection() {
  return (
    <section
      id="team"
      className="container mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-[100px] px-[100px] pb-[150px] pt-[100px]"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <h3 className="font-heading text-[1.3rem]/[1.8rem] font-medium">The team</h3>
        <p className="text-[1rem]/[1.5rem] font-light">Faces Behind the Magic</p>
      </div>
      <TeamCard name={team[0].name} title={team[0].role} img={team[0].image} />
      <div className="flex gap-[130px]">
        <TeamCard name={team[1].name} title={team[1].role} img={team[1].image} />
        <TeamCard name={team[2].name} title={team[2].role} img={team[2].image} />
        <TeamCard name={team[3].name} title={team[3].role} img={team[3].image} />
        <TeamCard name={team[4].name} title={team[4].role} img={team[4].image} />
      </div>
      <TeamCard name={team[5].name} title={team[5].role} img={team[5].image} />
    </section>
  );
}

const TeamCard = ({ name, title, img }: CardProps) => {
  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex items-center justify-center">
        <Image src={img} alt="team" width={100} height={100} priority />
      </div>
      <div className="flex flex-col items-center gap-2 text-[1rem]/[1.5rem]">
        <dt className="font-light">{name}</dt>
        <dd>{title}</dd>
      </div>
    </div>
  );
};
