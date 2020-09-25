
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {Button,Alert} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {GlobalContext} from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


function UploadPage() {
  const [files, setFiles] = useState([])
  return (
    <Layout>
      <SEO title="Upload" />
      <h2 style={{ textAlign: `center`, minHeight: `10vh`}}>Upload to Object Storage</h2>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={3}
        server="/api"
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </Layout>
  )
}

export default UploadPage
