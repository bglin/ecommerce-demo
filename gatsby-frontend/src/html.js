import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bokeh/1.0.4/bokeh.min.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bokeh/1.0.4/bokeh-widgets.min.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bokeh/1.0.4/bokeh-tables.css"/>

        <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossOrigin="anonymous"
    />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bokeh/1.0.4/bokeh.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bokeh/1.0.4/bokeh-widgets.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bokeh/1.0.4/bokeh-tables.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bokeh/1.0.4/bokeh-api.js"></script>
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
