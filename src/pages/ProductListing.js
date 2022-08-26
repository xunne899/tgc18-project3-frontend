import { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../contexts/Product";
import {Card, Button, Container, Row, Col} from "react-bootstrap";

export default function ProductListing() {
  //const context = useContext(ProductContext);
  const { context, products, pageIsLoaded } = useContext(ProductContext);
  
  useEffect(() => {
    context.getProducts();
    console.log(context);
  }, []);


const spice = products.filter(product =>{
  return(product.type.type ==="Spice")
 })

 const sauce = products.filter(product =>{
  return(product.type.type ==="Sauce")
 })

  return (
 
    <Fragment>
       <Container>
      <h1 className="text-center mt-3">Product Listings</h1>
      <div className="row  d-flex justify-content-center col-sm col-md col-lg">
      {/* <ul> */}
        
        { products && 
          products.length > 0 &&
          //  products.type.type.value === 'spice' &&
          spice.map((p) => (
            // <li>.
            //   <img src={p.image_url} style={{ width: "100px" }} alt={""}/>
            //   <div><Link to={"/product/" + p.id}>{p.name}</Link></div>
            //   <div>{p.country.country}</div>
            //   <div>{p.description}</div>
           
            // </li>
        
          //  if(p.type.type === "Spice"){
            <Card className="m-3 mx-2 border-0 shadow-lg gx-0"style={{ width: '18rem' }}>
                {/* <img src={p.image_url} style={{ width: "100%" }} alt={""}/> */}
            <Card.Img  variant="top" src={p.image_url} style={{ width: "cover"}} alt={""} />
            <Card.Body>
              <Card.Title>
                {p.name}
              </Card.Title>
              <Card.Title>
                {p.type.type}
              </Card.Title>
              {/* <img src={p.image_url} style={{ width: "100px" }} alt={""}/> */}
              <Card.Text className="mb-5">
              {p.description}
              </Card.Text>

              <Link to={"/product/" + p.id}><Button variant="dark" id="productButton"className="my-3 mt-5">More</Button></Link>
            </Card.Body>
          </Card>
            
        
        ))}
          
      {/* </ul> */}
      </div>



      <div className="row  d-flex justify-content-center col-sm col-md col-lg">
      {/* <ul> */}
        
        { products && 
          products.length > 0 &&
          //  products.type.type.value === 'spice' &&
          sauce.map((p) => (
            // <li>.
            //   <img src={p.image_url} style={{ width: "100px" }} alt={""}/>
            //   <div><Link to={"/product/" + p.id}>{p.name}</Link></div>
            //   <div>{p.country.country}</div>
            //   <div>{p.description}</div>
           
            // </li>
        
          //  if(p.type.type === "Spice"){
            <Card className="m-3 mx-2 border-0 shadow-lg gx-0"style={{ width: '18rem' }}>
                {/* <img src={p.image_url} style={{ width: "100%" }} alt={""}/> */}
            <Card.Img  variant="top" src={p.image_url} style={{ width: "cover"}} alt={""} />
            <Card.Body>
              <Card.Title>
                {p.name}
              </Card.Title>
              <Card.Title>
                {p.type.type}
              </Card.Title>
              {/* <img src={p.image_url} style={{ width: "100px" }} alt={""}/> */}
              <Card.Text className="mb-5">
              {p.description}
              </Card.Text>

              <Button variant="dark" id="productButton"className="my-3 mt-5">More</Button>
            </Card.Body>
          </Card>
            
        
        ))}
          
      {/* </ul> */}
      </div>
      </Container>
    </Fragment>
  );
}
