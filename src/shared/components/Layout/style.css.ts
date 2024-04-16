import { style } from '@vanilla-extract/css';

export const area = style({
  display: 'flex',
  width: 'calc(100vw - 100px)',
  height: 'calc(100vh - 160px)',
  margin: 'auto 0',
  position: 'fixed',
  top: '50%',
  transform: 'translateY(-50%)'
});

export const content = style({
  flex: '1 0 0',
  minWidth: '540px',
  padding: '20px',
  border: 'solid 1px #eef0f5',
  borderRadius: '20px',
  backgroundColor: '#f6f8fa',
  overflow: 'scroll'
});
