export const lightTheme = {
  backgroundColor: 'white',
  fontColor(opacity: number) {
    return `rgba(0, 0, 0, ${opacity})`;
  },
  // fontColor: 'black',
};
export const blackTheme = {
  backgroundColor: '#1a1d24',
  fontColor: 'white',
};

export const theme = {
  color: lightTheme,
};

export type Theme = typeof theme;
