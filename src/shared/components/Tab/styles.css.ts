import { globalStyle, style } from '@vanilla-extract/css';

export const navList = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100px',
  height: '100vh',
  padding: '10px 8px',
  overflow: 'scroll'
});

export const navItem = style({
  width: '64px',
  height: '64px',
  marginBottom: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #dfe4f0',
  borderRadius: '12px',
  backgroundColor: '#fff',
  cursor: 'pointer',

  selectors: {
    '&:last-of-type': {
      marginBottom: '0'
    },

    '&.active': {
      border: 'none',
      backgroundColor: '#253FEB'
    }
  }
});

export const navItemText = style({
  color: '#A4AABB',
  textAlign: 'center'
});

globalStyle(`${navItem}.active > ${navItemText}`, {
  color: '#fff'
});
