import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../contexts/Product";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import SearchForm from "../components/Search";

export default function ProductListing() {

  const baseUrl = "https://project3-spice-sauce.herokuapp.com/";

  const { context, products, pageIsLoaded } = useContext(ProductContext);
  const [searchResult, setSearchResult] = React.useState([]);

  useEffect(() => {
    context.getProducts();
    console.log(context);
  }, []);

  useEffect(() => {
    console.log("search=>", searchResult);
    context.searchProducts(searchResult);
  }, [searchResult]);

  const spice = products.filter((product) => {
    return product.type.type === "Spice";
  });

  const sauce = products.filter((product) => {
    return product.type.type === "Sauce";
  });

  return (
    <Fragment>
      <Container>

        <div className="row  d-flex justify-content-center col-sm col-md col-lg">
          <SearchForm setSearchResult={setSearchResult} />
          {products &&
            products.length > 0 &&
            spice.map((p, i) => (
              <Card key={`spice_${i}`} className="m-3 border-0 shadow-lg gx-0 productCard" style={{ width: "18rem", marginBottom: "75px",textDecoration:"none",color:"black" }} as={Link} to={`./${p.id}`}>
                <Card.Img variant="top" src={p.image_url} style={{ width: "cover" }} alt={""} />
                <Card.Body style={{ height: "16.5rem" }}>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Title>{p.type.type}</Card.Title>
                  <Card.Text className="mb-4">{p.description}</Card.Text>
                  <Link to={`./${p.id}`}>
                    <Button variant="dark" id="productButton" className="my-3 ">
                      More
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            ))}
        </div>

        <div className="row  d-flex justify-content-center col-sm col-md col-lg mb-4">
          {products &&
            products.length > 0 &&
            sauce.map((p, i) => (
              <Card key={`sauce_${i}`} className="m-3 border-0 shadow-lg gx-0 productCard" style={{ width: "18rem", marginBottom: "75px", textDecoration:"none",color:"black" }} as={Link} to={`./${p.id}`}>
                <Card.Img variant="top" src={p.image_url} style={{ width: "cover" }} alt={""} />
                <Card.Body style={{ height: "15rem" }}>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Title>{p.type.type}</Card.Title>
                  <Card.Text className="mb-4">{p.description}</Card.Text>
                  <Link  to={`./${p.id}`}>
                    <Button  variant="dark" id="productButton" className="my-3">
                      More
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            ))}
        </div>
      </Container>
    </Fragment>
  );
}
