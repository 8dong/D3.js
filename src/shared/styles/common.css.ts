import { style } from '@vanilla-extract/css';

export const srOnly = style({
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  border: 'none',
  overflow: 'hidden',
  position: 'absolute'
});
