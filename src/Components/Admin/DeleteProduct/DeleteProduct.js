import { useEffect, useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';

const DeleteProduct = () => {
    
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState();
    
    useEffect(() => {
        fetch(`https://powerful-sierra-34042.herokuapp.com/product/${category}`)
        .then((res) => res.json())
        .then((data) => {
            setProducts(data);
        });
    }, [category]);

    // delete specific product
    const handleDelete = (id)=>{
        
        fetch(`https://powerful-sierra-34042.herokuapp.com/product/delete/${id}`,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(res => alert(res.message))
    }

    

    return (
        <div>
            <Dropdown className="d-inline-block mb-2 float-right">
                  <Dropdown.Toggle variant="danger">
                  Category
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setCategory('oil')} href="">
                        Oil
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategory('rice')} href="">
                        Rice
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategory('beverages')} href="">
                        Beverages
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategory('bakery')} href="">
                        Bakery
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategory('ingredients')} href="">
                        Ingredients(মসলা)
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategory('beauty')} href="">
                        Beauty & Health
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategory()} href="">
                        All
                    </Dropdown.Item>
                  </Dropdown.Menu>       
            </Dropdown><br /><br/>
                    
            {
                products.length?<div>
                <div className="row">
                 {
                     products.map(product => <>
                     <div className="col-lg-4 col-md-6">
                        <div style={{height: '500px'}} className="card">
                            <div className="card-img">
                                    <img className="" src={`https://powerful-sierra-34042.herokuapp.com/${product.image}`} alt="" />
                            </div>
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>Taka {product.price}</Card.Text>
                                <Card.Text>Stock {product.stock}</Card.Text>
                                <button onClick={()=> handleDelete(product._id)} type="button" className="btn btn-danger btn-lg btn-block">
                                   Delete
                                </button>
                            </Card.Body>
                        </div>
                    </div>
                     
                     </>)
                 }
                
            </div>
          </div>: <h2>No Products Available</h2>
            }
        </div>
        
    );
};

export default DeleteProduct;