import { StyleSheetServer } from 'aphrodite'
import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react';

import { APHRODITE_DATA_KEY } from '../shared/constants';

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
          <style dangerouslySetInnerHTML={{ __html: `
            * {
              box-sizing: border-box;
            }
          `}}
          />

          <style dangerouslySetInnerHTML={{ __html: this.props.css.content }} data-aphrodite />
        </Head>
        <body>
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
    )
  }
}
