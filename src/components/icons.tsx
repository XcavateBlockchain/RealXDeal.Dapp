import {
  Wallet,
  XLogo,
  DiscordLogo,
  TelegramLogo,
  GameController,
  PuzzlePiece,
  Alien,
  Medal,
  Storefront,
  GearSix,
  Power,
  CheckCircle,
  CaretLeft,
  Spinner
} from '@phosphor-icons/react/dist/ssr';

export type IconType = keyof typeof Icons;

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  wallet: Wallet,
  xLogo: XLogo,
  discord: DiscordLogo,
  telegram: TelegramLogo,
  GameController: GameController,
  PuzzlePiece: PuzzlePiece,
  Alien: Alien,
  Medal: Medal,
  Storefront: Storefront,
  GearSix: GearSix,
  Power: Power,
  CheckCircle: CheckCircle,
  CaretLeft: CaretLeft,
  spinner: Spinner,
  close: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M12.3955 7.59497L7.60352 12.387"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.397 12.3899L7.60095 7.5929"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3345 0.750244H5.66549C2.64449 0.750244 0.750488 2.88924 0.750488 5.91624V14.0842C0.750488 17.1112 2.63549 19.2502 5.66549 19.2502H14.3335C17.3645 19.2502 19.2505 17.1112 19.2505 14.0842V5.91624C19.2505 2.88924 17.3645 0.750244 14.3345 0.750244Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  copy: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M15.1442 7.61536H16.3846C17.2131 7.61536 17.8846 8.28693 17.8846 9.11536L17.8846 17.625C17.8846 18.4534 17.2131 19.125 16.3846 19.125H10.6154C9.78697 19.125 9.1154 18.4534 9.1154 17.625V16.3846M10.2115 5.42303V8.7115H6.92308M6.375 8.01399L9.47002 4.875H13.6442C14.4727 4.875 15.1442 5.54657 15.1442 6.375L15.1442 14.8846C15.1442 15.713 14.4727 16.3846 13.6442 16.3846H7.875C7.04657 16.3846 6.375 15.713 6.375 14.8846V8.01399Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  goldMedal: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 23" fill="none" {...props}>
      <path
        d="M8.83887 14.5829L11.3787 15.7454L6.22108 22.8272L4.74072 20.2099L8.83887 14.5829Z"
        fill="#CE4444"
      />
      <path
        d="M8.83887 14.5829L6.299 13.4204L1.14134 20.5023L4.74072 20.2099L8.83887 14.5829Z"
        fill="#983535"
      />
      <path
        d="M12.4624 14.5829L9.92253 15.7454L15.0802 22.8272L16.5605 20.2099L12.4624 14.5829Z"
        fill="#983535"
      />
      <path
        d="M12.4624 14.5829L15.0023 13.4204L20.1599 20.5023L16.5605 20.2099L12.4624 14.5829Z"
        fill="#CE4444"
      />
      <path
        d="M10.5724 17.1387C15.5633 17.1387 19.8167 13.9133 19.8167 9.70674C19.8167 5.50014 15.5633 2.27478 10.5724 2.27478C5.58144 2.27478 1.32812 5.50014 1.32812 9.70674C1.32812 13.9133 5.58144 17.1387 10.5724 17.1387Z"
        fill="url(#paint0_linear_311_3749)"
        stroke="#765C00"
      />
      <ellipse cx="10.5723" cy="9.7068" rx="6.82569" ry="5.41102" fill="#A88300" />
      <mask
        id="mask0_311_3749"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="4"
        y="4"
        width="14"
        height="12"
      >
        <ellipse cx="10.9358" cy="10.2843" rx="6.84158" ry="5.42362" fill="#C28B37" />
      </mask>
      <g mask="url(#mask0_311_3749)">
        <ellipse cx="10.5711" cy="9.7067" rx="6.84158" ry="5.42362" fill="#C09525" />
      </g>
      <path
        d="M10.6096 5.93359L12.0854 8.2735L15.0371 8.56598L13.0103 10.3677L13.5613 12.9533L10.6096 11.7833L7.65795 12.9533L8.21385 10.3677L6.18213 8.56598L9.13378 8.2735L10.6096 5.93359Z"
        fill="url(#paint1_linear_311_3749)"
      />
      <path
        d="M2.11756 5.5045L3.07983 3.82563L2.11756 2.14676L4.23535 2.9096L6.35315 2.14676L5.39087 3.82563L6.35315 5.5045L4.23535 4.74166L2.11756 5.5045Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_311_3749"
          x1="10.5724"
          y1="2.77478"
          x2="10.5724"
          y2="16.6387"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFC600" />
          <stop offset="1" stopColor="#FFDE69" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_311_3749"
          x1="10.6096"
          y1="5.93359"
          x2="10.6096"
          y2="12.9533"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFCDD" />
          <stop offset="1" stopColor="#FFE896" />
        </linearGradient>
      </defs>
    </svg>
  ),
  silverMedal: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="26"
      viewBox="0 0 22 26"
      fill="none"
    >
      <path
        d="M9.15967 15.6006L11.852 16.9919L6.38471 25.4679L4.81548 22.3354L9.15967 15.6006Z"
        fill="#418ED6"
      />
      <path
        d="M9.15967 15.6006L6.46731 14.2093L1 22.6853L4.81548 22.3354L9.15967 15.6006Z"
        fill="#2B63A6"
      />
      <path
        d="M13.0005 15.6006L10.3081 16.9919L15.7754 25.4679L17.3447 22.3354L13.0005 15.6006Z"
        fill="#2B63A6"
      />
      <path
        d="M13.0005 15.6006L15.6928 14.2093L21.1602 22.6853L17.3447 22.3354L13.0005 15.6006Z"
        fill="#418ED6"
      />
      <path
        d="M11.0754 18.5611C16.4172 18.5611 20.8447 14.6734 20.8447 9.76451C20.8447 4.85559 16.4172 0.967896 11.0754 0.967896C5.73356 0.967896 1.30615 4.85559 1.30615 9.76451C1.30615 14.6734 5.73356 18.5611 11.0754 18.5611Z"
        fill="#E3E3E3"
        stroke="#404040"
      />
      <ellipse cx="11.0753" cy="9.76459" rx="7.23549" ry="6.47626" fill="#595959" />
      <mask
        id="mask0_311_3767"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="4"
        y="3"
        width="15"
        height="14"
      >
        <ellipse cx="11.4623" cy="10.4559" rx="7.25233" ry="6.49134" fill="#C28B37" />
      </mask>
      <g mask="url(#mask0_311_3767)">
        <ellipse
          cx="11.0761"
          cy="9.76453"
          rx="7.25233"
          ry="6.49134"
          fill="url(#paint0_linear_311_3767)"
        />
      </g>
      <path
        d="M11.1152 5.24866L12.6796 8.0492L15.8085 8.39927L13.66 10.5557L14.244 13.6503L11.1152 12.25L7.98631 13.6503L8.57557 10.5557L6.42188 8.39927L9.55074 8.0492L11.1152 5.24866Z"
        fill="url(#paint1_linear_311_3767)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_311_3767"
          x1="11.0761"
          y1="3.27319"
          x2="11.0761"
          y2="16.2559"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9CA1A3" />
          <stop offset="1" stopColor="#9CA1A3" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_311_3767"
          x1="11.1152"
          y1="5.24866"
          x2="11.1152"
          y2="13.6503"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F1F5F5" />
          <stop offset="0.0001" stopColor="white" />
          <stop offset="1" stopColor="#F1F5F5" />
        </linearGradient>
      </defs>
    </svg>
  ),
  bronzeMedal: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="26"
      viewBox="0 0 22 26"
      fill="none"
    >
      <path
        d="M9.15967 15.6006L11.852 16.9919L6.38476 25.4679L4.81556 22.3354L9.15967 15.6006Z"
        fill="#AA75CB"
      />
      <path
        d="M9.15967 15.6006L6.46737 14.2093L1.00016 22.6853L4.81556 22.3354L9.15967 15.6006Z"
        fill="#73488D"
      />
      <path
        d="M13.0005 15.6006L10.3082 16.9919L15.7754 25.4679L17.3446 22.3354L13.0005 15.6006Z"
        fill="#73488D"
      />
      <path
        d="M13.0005 15.6006L15.6928 14.2093L21.16 22.6853L17.3446 22.3354L13.0005 15.6006Z"
        fill="#AA75CB"
      />
      <path
        d="M11.0757 18.5611C16.4175 18.5611 20.8448 14.6734 20.8448 9.76451C20.8448 4.8556 16.4175 0.967896 11.0757 0.967896C5.73396 0.967896 1.30664 4.8556 1.30664 9.76451C1.30664 14.6734 5.73396 18.5611 11.0757 18.5611Z"
        fill="#DC9E42"
        stroke="#774700"
      />
      <ellipse cx="11.0757" cy="9.76447" rx="7.23535" ry="6.47626" fill="#734C12" />
      <mask
        id="mask0_311_3784"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="4"
        y="3"
        width="15"
        height="14"
      >
        <ellipse cx="11.4617" cy="10.4559" rx="7.25219" ry="6.49133" fill="#C28B37" />
      </mask>
      <g mask="url(#mask0_311_3784)">
        <ellipse cx="11.0754" cy="9.76453" rx="7.25219" ry="6.49133" fill="#A36D1D" />
      </g>
      <path
        d="M11.1146 5.2486L12.679 8.04914L15.8078 8.39921L13.6593 10.5556L14.2434 13.6502L11.1146 12.25L7.98579 13.6502L8.57504 10.5556L6.42139 8.39921L9.55019 8.04914L11.1146 5.2486Z"
        fill="url(#paint0_linear_311_3784)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_311_3784"
          x1="11.1146"
          y1="5.2486"
          x2="11.1146"
          y2="13.6502"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FCFF80" />
          <stop offset="0.401042" stopColor="#FDE870" />
          <stop offset="1" stopColor="#FFC759" />
        </linearGradient>
      </defs>
    </svg>
  ),
  exit: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
  //   copy: (props: IconProps) => (
  //     <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  // <path d="M13.1875 0.25H4.1875C4.03832 0.25 3.89524 0.309263 3.78975 0.414753C3.68426 0.520242 3.625 0.663316 3.625 0.8125V3.625H0.8125C0.663316 3.625 0.520242 3.68426 0.414753 3.78975C0.309263 3.89524 0.25 4.03832 0.25 4.1875V13.1875C0.25 13.3367 0.309263 13.4798 0.414753 13.5852C0.520242 13.6907 0.663316 13.75 0.8125 13.75H9.8125C9.96168 13.75 10.1048 13.6907 10.2102 13.5852C10.3157 13.4798 10.375 13.3367 10.375 13.1875V10.375H13.1875C13.3367 10.375 13.4798 10.3157 13.5852 10.2102C13.6907 10.1048 13.75 9.96168 13.75 9.8125V0.8125C13.75 0.663316 13.6907 0.520242 13.5852 0.414753C13.4798 0.309263 13.3367 0.25 13.1875 0.25ZM9.25 12.625H1.375V4.75H9.25V12.625ZM12.625 9.25H10.375V4.1875C10.375 4.03832 10.3157 3.89524 10.2102 3.78975C10.1048 3.68426 9.96168 3.625 9.8125 3.625H4.75V1.375H12.625V9.25Z" fill="#DC7DA6"/>
  // </svg>

  //   )
};
