import { StyleSheetServer } from 'aphrodite';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

import { APHRODITE_DATA_KEY, CURRENT_USER_DATA_KEY } from '../shared/constants';
import { greys, core } from '../shared/styles/color';
import { font } from '../shared/styles/size';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage, req }) {
    const { html, css } = StyleSheetServer.renderStatic(() => renderPage());

    return {
      ...html,
      css,
      user: req.user,
    };
  }

  render() {
    const cssFilePath = process.env.NODE_ENV === 'development' ? '/_next/static/style.css' : process.env.CLOUDFRONT_DOMAIN_NAME + '/static/style.css';
    return (
      <html>
        <Head>
          <link rel="stylesheet" href={cssFilePath} />
          <style dangerouslySetInnerHTML={{ __html: `
            * {
              box-sizing: border-box;
            }

            @font-face{
              font-style: normal;
              font-weight: normal;
              font-family: ProximaNova-Reg;
              src: url(/static/ProximaNova-Reg.ttf) format("truetype");
            }

            @font-face{
              font-style: normal;
              font-weight: normal;
              font-family: ProximaNova-Bold;
              src: url(/static/ProximaNova-Bold.ttf) format("truetype");
            }

            @font-face{
              font-style:normal;
              font-weight:normal;
              font-family:ProximaNova-Sbold;
              src: url(/static/ProximaNova-Sbold.ttf) format("truetype");
            }

            @font-face{
              font-style: normal;
              font-weight: normal;
              font-family: ProximaNova-Xbold;
              src: url(/static/ProximaNova-Xbold.ttf) format("truetype");
            }

            body {
              font-size: ${font.medium},
              color: ${core.black},
              line-height:1.48;
              font-family: "ProximaNova-Reg", "ProximaNova-Bold", "ProximaNova-Sbold", "ProximaNova-Xbold"
            }
          `}}
          />
          <style dangerouslySetInnerHTML={{ __html: this.props.css.content }} data-aphrodite />
        </Head>
        <body style={{ background: greys.wind, padding: 0, margin: 0 }}>
          <script type='text/javascript'
            dangerouslySetInnerHTML={{
              __html: `
                window.${APHRODITE_DATA_KEY} = ${JSON.stringify(this.props.css.renderedClassNames)};
                window.${CURRENT_USER_DATA_KEY} = ${this.props.user ? JSON.stringify(this.props.user) : null};
              `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
