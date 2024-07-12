import localFont from 'next/font/local';

export const fontHeading = localFont({
  src: [
    {
      path: '../app/fonts/DrukTextWideMediumTrial.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../app/fonts/DrukTextWideBoldTrial.otf',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-heading'
});
