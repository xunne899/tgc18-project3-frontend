import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../contexts/Product";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import SearchForm from "../components/Search";

export default function ProductListing() {
  //const context = useContext(ProductContext);

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
        {/* <h1 className="text-center mt-3">Product Listings</h1> */}

        <div className="row  d-flex justify-content-center col-sm col-md col-lg">
          {/* <ul> */}
          <SearchForm setSearchResult={setSearchResult} />
          {products &&
            products.length > 0 &&
            //  products.type.type.value === 'spice' &&
            spice.map((p, i) => (
              // <li>.
              //   <img src={p.image_url} style={{ width: "100px" }} alt={""}/>
              //   <div><Link to={"/product/" + p.id}>{p.name}</Link></div>
              //   <div>{p.country.country}</div>
              //   <div>{p.description}</div>

              // </li>

              //  if(p.type.type === "Spice"){
              <Card key={`spice_${i}`} className="m-3 border-0 shadow-lg gx-0" style={{ width: "18rem", marginBottom: "75px",textDecoration:"none",color:"black" }} as={Link} to={`./${p.id}`}>
                {/* <img src={p.image_url} style={{ width: "100%" }} alt={""}/> */}
                <Card.Img variant="top" src={p.image_url} style={{ width: "cover" }} alt={""} />
                <Card.Body style={{ height: "16.5rem" }}>
                  {/* <Card.Title>
                {p.id}
              </Card.Title> */}
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

          {/* </ul> */}
        </div>

        <div className="row  d-flex justify-content-center col-sm col-md col-lg mb-4">
          {/* <ul> */}

          {products &&
            products.length > 0 &&
            //  products.type.type.value === 'spice' &&
            sauce.map((p, i) => (
              <Card key={`sauce_${i}`} className="m-3 border-0 shadow-lg gx-0" style={{ width: "18rem", marginBottom: "75px", textDecoration:"none",color:"black" }} as={Link} to={`./${p.id}`}>
                {/* <img src={p.image_url} style={{ width: "100%" }} alt={""}/> */}
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

          {/* </ul> */}
        </div>
      </Container>
    </Fragment>
  );
}
