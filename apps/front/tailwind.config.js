const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

const DRAWER_WIDTH = '280px';
const HEADER_HEIGHT = '110px';

module.exports = {
  mode: 'jit',
  content: [
    'apps/front/src/**/*.{js,jsx,ts,tsx}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        black: '#131F2A',
        'dropdown-border': '#7070701A',
        orange: '#f15010',
        borderOrange: '#131F2A21',
        borderBle: '#ED590A4A',
        inputColor: '#131F2A',
        gray: '#B8B8B8',
        baseGray: '#5e6162',
        lightGray: '#f1f1f1',
        inputError: '#f87272',
        baseOrange: '#f15010',
        baseBlue: '#131f2a',
        chip: '#e6e6e6',
        inputPlaceHolder: '#5e6162',
        grey1: '#F6F7F7',
        lightOrange: '#EBEBEB',
        search: 'rgba(255, 255, 255, 0.06)',
        tableBorder: '#70707040',
        tableRow: '#F6F6F7',
      },
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      minHeight: {
        12: '3rem',
        table: '650px',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        input: '60px',
      },
      maxHeight: { '1/4': '25%', '1/2': '50%', '3/4': '75%' },
      maxWidth: { '1/4': '25%', '1/2': '50%', '3/4': '75%' },
      height: {
        'dropdown-item': '40px',
        baseBtn: '70px',
        smallBtn: '40px',
        medBtn: '64px',
        heightLogo: 110,
        checkBox: '30px',
        input: '60px',
      },
      width: {
        maxContent: 'max-content',
        widthLogo: 90,
        widthLogoContainer: 118,
        checkBox: '30px',
        logoVan: 191,
      },
      spacing: {
        header: HEADER_HEIGHT,
        drawer: DRAWER_WIDTH,
        input: '60px',
        chip: '24px',
      },
      borderRadius: {
        DEFAULT: '5px',
        checkBox: '3px',
        boxRegister: '11px',
      },
      inset: {
        select: 'calc(100% + 10px)',
      },
      boxShadow: {
        boxShadowLogo: '0px 9px 27px #00000026',
        table: '0px 10px 20px #131F2A0D',
      },
      fontSize: {
        text15: '15px',
        text18: '18px',
        text20: '20px',
        text22: '22px',
        text26: '26px',
        text27: '27px',
        text28: '28px',
        text42: '42px',
        text43: '43px',
        text48: '48px',
        text62: '62px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: ['#root', '#modals'],
};
