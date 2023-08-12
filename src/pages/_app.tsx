import { AppProps } from 'next/app'
import { Global, css } from '@emotion/react'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Global
        styles={css`
          html,
          body,
          div,
          main,
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
          ins,
          kbd,
          q,
          s,
          samp,
          small,
          strike,
          strong,
          sub,
          sup,
          tt,
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
          table,
          caption,
          tbody,
          tfoot,
          thead,
          tr,
          th,
          td,
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
          video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            color: inherit;
            vertical-align: baseline;
            box-sizing: border-box;
          }

          /* HTML5 display-role reset for older browsers */
          article,
          aside,
          details,
          figcaption,
          figure,
          footer,
          header,
          hgroup,
          menu,
          nav,
          section {
            display: block;
          }

          html,
          body,
          #wrap {
            width: 100%;
            height: 100%;
            margin: 0px;
            padding: 0px;
            overflow-y: hidden;
            -ms-overflow-style: -ms-autohiding-scrollbar;
          }

          body {
            line-height: 1;
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            color: #000000;
            min-width: fit-content;
            font-family: 'Spoqa Han Sans Neo', 'sans-serif';
          }

          ol,
          ul {
            list-style: none;
          }

          blockquote,
          q {
            quotes: none;
          }

          blockquote:before,
          blockquote:after,
          q:before,
          q:after {
            content: '';
            content: none;
          }

          table {
            border-collapse: collapse;
            border-spacing: 0;
          }

          button {
            overflow: visible;
            padding: 0;
            border: none;
            border-radius: 0;
            box-shadow: none;
            cursor: pointer;
            background: none;
            outline: none;
          }

          a {
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
            line-height: 0;
            margin: 0;
            padding: 0;
            user-select: none;
            font-family: 'Spoqa Han Sans Neo', 'sans-serif';
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
            -webkit-touch-callout: none;
            -webkit-user-select: auto;
            -ms-user-select: auto;
          }

          input {
            border-radius: 4px;
            box-shadow: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            -o-appearance: none;
            appearance: none;
            &:focus {
              outline: none;
            }
          }
        `}
      />
      <Component {...pageProps} />
    </>
  )
}

export default App
