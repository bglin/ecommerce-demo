import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalCart from "../components/cart";
import {Row,Col,Button} from "react-bootstrap";
import {GlobalContext} from "../context/GlobalContext";
import PropTypes from "prop-types"
import React, {useState,useContext} from "react"

function Header ({ siteTitle }) {

  const {cart,setCart} = useContext(GlobalContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
  <header
    style={{
      background: `#C74634`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "1.45rem",
        margin: "0 auto",
        maxWidth: "1460px"
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>

      <h2>
      <Row>

        <Col>
          <Button style={{background:'transparent'}} variant="outline-light" onClick={handleShow}>
            <FontAwesomeIcon icon={"shopping-cart"} size="lg" />
          </Button>
        </Col>

        <Col>
          <Link to="/admin-dashboard"
          style={{
            color: `white`,
            textDecoration: `none`
          }}>
            <Button style={{background:'transparent'}} variant="outline-light">
            <FontAwesomeIcon icon={"chart-line"} size="lg"/>
            </Button>
          </Link>
        </Col>

        <Col>
          <Link to="/upload"
          style={{
            color: `white`,
            textDecoration: `none`
          }}>
            <Button style={{background:'transparent'}} variant="outline-light">
            <FontAwesomeIcon icon={"cloud-upload-alt"} size="lg"/>
            </Button>
          </Link>
        </Col>





      </Row>
      </h2>
    </div>
    <ModalCart handleClose={handleClose} show={show} cart={cart} setCart={setCart} />
  </header>


)
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
