import { Button,Container,Figure,Row,Col} from "react-bootstrap";
import { Link } from "gatsby"
import React from "react"


function ProductCatalog({ products,addToCart }) {

  return (
      <Row>
      {products.map((data,idx) => (
      <Col md={4}>
      <Container key={idx} className="content">

       <Figure>
       
       <Link to="/product"
             state={{product:data}}
             style={{color: `grey`,
                     textDecoration: `none`}}>
       <Figure.Image
              width={151}
              height={160}
              alt="171x180"
              src={data.image_url}
              rounded
            />
      </Link>

      <Link to="/product"
            state={{product:data}}
            style={{color: `grey`,
                    textDecoration: `none`}}>
            <Figure.Caption>
            <h4>
              {data.name}
            </h4>
            </Figure.Caption>
      </Link>
            <Button variant="primary" onClick={() => addToCart(data)}>Add to Cart</Button>
       </Figure>

      </Container>
      </Col>
      ))}
      </Row>
)

};

export default ProductCatalog
