import { style } from '@vanilla-extract/css';

export const area = style({
  width: '100%',
  height: '100%',
  padding: '50px',
  position: 'relative'
});

export const tooltip = style({
  position: 'absolute',
  zIndex: '1',
  opacity: '0',

  selectors: {
    '&::after': {
      content: '',
      display: 'block',
      width: '12px',
      height: '12px',
      borderBottom: '1px solid #253FEB',
      borderRight: '1px solid #253FEB',
      backgroundColor: '#fff',
      position: 'absolute',
      top: 'calc(50% + 14px)',
      left: '50%',
      transform: 'translateX(-50%) rotate(45deg)'
    }
  }
});

export const tooltipContent = style({
  border: '1px solid #253FEB',
  borderRadius: '8px',
  display: 'inline-block',
  padding: '10px 15px',
  fontWeight: '700',
  color: '#253FEB',
  backgroundColor: '#fff'
});
