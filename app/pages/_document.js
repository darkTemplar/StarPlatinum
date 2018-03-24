import { StyleSheetServer } from 'aphrodite';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

import { APHRODITE_DATA_KEY } from '../shared/constants';
import { greys } from '../shared/styles/color';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, css } = StyleSheetServer.renderStatic(() => renderPage());

    return {
      ...html,
      css,
    };
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <style dangerouslySetInnerHTML={{ __html: `
            * {
              box-sizing: border-box;
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
              `
            }}
          />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
