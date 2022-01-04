import React from 'react';
import './AddProduct.css';
const AddProduct = () => {
    return (
        <>
             <h4 className="titleStyle text-center"> Add New Product </h4>
               <div className="form-design">
               <iframe className="d-none" id="hidden-iframe"> </iframe>
                    <form
                        action="http://localhost:5000/product"
                        method="post"
                        encType="multipart/form-data"
                        target="hidden-iframe"
                    >
                        <label htmlFor="files" className="btn btn-secondary mb-4">
                            Upload Product Image
                        </label>
                        <br />
                        <input id="files" type="file" name="avatar" required />
                        <br />
                        <br />
                        <label htmlFor="title">Product Title</label>
                        <br />
                        <input id="title" type="text" name="title" required className="form-control item mb-2" />
                        <label htmlFor="description">Product Description</label>
                        <br />
                        <textarea
                            id="description"
                            className="form-control item mb-2"
                            type="text"
                            name="description"
                            autocomplete="off"
                            required
                        />
                        
                        <label htmlFor="catergory">Choose a category</label>
                        <br />
                        <select id="category" name="category" className="form-control item mb-2">
                            <option value="oil">Oil</option>
                            <option value="beverages">Beverages</option>
                            <option value="rice">Rice</option>
                            <option value="bakery">Bakery</option>
                            <option value="ingredients">Ingredients(মসলা)</option>
                            <option value="beauty">Beauty & Health</option>
                        </select>
                        
                        <label htmlFor="price">Product Price</label>
                        <br />
                        <input className="form-control item mb-2" id="price" type="text" name="price" required />
                    
                        <label htmlFor="stock">Stock</label>
                        <br />
                        <input className="form-control item mb-3" id="stock" type="text" name="stock" required />
                        <input className="btn btn-success d-block w-100" type="submit" value="Submit" />
                    </form>
                </div>
        </>
    );
};

export default AddProduct;

