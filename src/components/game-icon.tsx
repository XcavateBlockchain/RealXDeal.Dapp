export type IconType = keyof typeof GameICons;

export type GameIconProps = React.HTMLAttributes<SVGElement>;

export const GameICons = {
  player: (props: GameIconProps) => (
    <svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="19.6172" cy="19.2998" r="19" fill="#ECB278" />
    </svg>
  ),
  pro: (props: GameIconProps) => (
    <svg viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M18 0L35.3205 30H0.679491L18 0Z" fill="#4F6542" />
    </svg>
  ),
  practice: (props: GameIconProps) => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="40" height="40" fill="#DC7DA6" />
    </svg>
  )
};
