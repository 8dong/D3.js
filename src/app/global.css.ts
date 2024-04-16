import { globalStyle } from '@vanilla-extract/css';

globalStyle(
  `html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  button,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  input,
  ins,
  kbd,
  q,
  s,
  samp,
  select,
  small,
  strike,
  sub,
  sup,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  hr,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video`,
  {
    margin: '0',
    padding: '0',
    border: '0',
    outline: 'none',
    verticalAlign: 'baseline',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    fontStyle: 'normal',
    color: '#000'
  }
);

globalStyle('*', {
  WebkitTapHighlightColor: 'rgba(255,255,255,0)',
  WebkitTouchCallout: 'none',
  userSelect: 'none'
});

globalStyle(`h1, h2, h3, h4, h5, h6`, { fontWeight: '500' });

globalStyle(`ul, ol, li, th, td`, { listStyle: 'none' });

globalStyle(`strong, span, em, b, u, i, li, dt, dd, p`, {
  fontSize: 'inherit',
  color: 'inherit',
  letterSpacing: 'inherit'
});

globalStyle(`strong, b`, { fontWeight: '500' });

globalStyle(`a`, { fontSize: 'inherit', textDecoration: 'none' });

globalStyle(`button, label`, { background: 'none', fontSize: 'inherit', cursor: 'pointer' });

globalStyle(`input, textarea`, {
  WebkitAppearance: 'none',
  WebkitBorderRadius: '0',
  fontFamily: 'sans-serif'
});

globalStyle(`legend, caption `, { display: 'none' });

globalStyle(`img`, { width: '100%' });

globalStyle(`body`, { WebkitTextSizeAdjust: '100%', overflow: 'hidden' });
