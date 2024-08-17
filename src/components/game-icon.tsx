export type IconType = keyof typeof GameICons;

export type GameIconProps = React.HTMLAttributes<SVGElement>;

export const GameICons = {
  player: (props: GameIconProps) => (
    <svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="19.6172" cy="19.2998" r="19" fill="#ECB278" />
    </svg>
  ),
  pro: (props: GameIconProps) => (
    <svg viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17.5234 0.299805L34.4109 29.5498H0.635942L17.5234 0.299805Z" fill="#78B36E" />
    </svg>
  )
};
