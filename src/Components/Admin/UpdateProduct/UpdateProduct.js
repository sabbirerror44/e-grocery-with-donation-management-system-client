import { useEffect, useState } from 'react';
import { Button, Card, Dropdown, Modal } from 'react-bootstrap';
const UpdateProduct = () => {
    const [show, setShow] = useState(false);
    const [productId, setProductId] = useState();
    const handleShow = (id) => {
        setProductId(id);
        setShow(true);
    }
    const handleClose = ()=>{
        setUpdateData({
            title: '',
            description: '',
            price: '',
            stock: '',
        })
        setShow(false);
    }
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState();
    const [updateData, setUpdateData] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
    });
    useEffect(() => {
        fetch(`http://localhost:5000/product/${category}`)
        .then((res) => res.json())
        .then((data) => {
            setProducts(data);
        });
    }, [category]);

    const handleSubmit =(e) =>{
        e.preventDefault();
        setShow(false);
        const updateObj = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v != ''));
        fetch(`http://localhost:5000/product/update/${productId}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updateObj),
        })
        .then(res => res.json())
        .then(res => {
            alert(res.message);
        })
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
            </Dropdown><br /> <br />
                    
            {
                products.length?<div>
                <div className="row">
                 {
                     products.map(product => <>
                     <div className="col-lg-4 col-md-6">
                        <div style={{height: '500px'}}  className="card">
                            <div className="card-img">
                                    <img className="" src={`http://localhost:5000/${product.image}`} alt="" />
                            </div>
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>Taka {product.price}</Card.Text>
                                <Card.Text>Stock {product.stock}</Card.Text>
                                <button onClick={()=> handleShow(product._id)} type="button" className="btn btn-success btn-lg btn-block">
                                   Update
                                </button>
                            </Card.Body>
                        </div>
                        <Modal show={show} >
                               <div className="m-5 p-4">
                                    <form onSubmit={handleSubmit}>
                                        <label htmlFor="title">Product Title</label>
                                        <br />
                                        <input id="title" type="text" onChange={(e)=> setUpdateData({...updateData, title: e.target.value})} className="mb-2" />
                                        <br />
                                        <label htmlFor="description">Product Description</label>
                                        <br />
                                        <input
                                            id="description"
                                            className="mb-2"
                                            onChange={(e)=> setUpdateData({...updateData, description: e.target.value})}
                                            type="text"
                                        />
                                        <br />
                                        <label htmlFor="price">Product Price</label>
                                        <br />
                                        <input className="mb-2" id="price" type="text" onChange={(e)=> setUpdateData({...updateData, price: e.target.value})} />
                                        <br />
                                        <label htmlFor="stock">Stock</label>
                                        <br />
                                        <input className="mb-2" id="stock" type="text"  onChange={(e)=> setUpdateData({...updateData, stock: e.target.value})} />
                                        <br />
                                        <input className="btn btn-dark" type="submit" value="Submit" />
                                    </form>
                                </div>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                         </Modal>
                    </div>
                     
                     </>)
                 }
                
            </div>
          </div>: <h2>No Products Available</h2>
            }
        </div>
        
    );
};

export default UpdateProduct;