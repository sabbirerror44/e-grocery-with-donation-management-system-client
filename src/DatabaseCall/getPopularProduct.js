

const getPopularProduct = () => {
    return new Promise( async function(onSuccess, onError){
        try{

            function firstFetch(callback){
                // var uniqueProduct = [];
             
                fetch(`https://powerful-sierra-34042.herokuapp.com/order/all`)
                .then(res => res.json())
                .then((data) =>{
                    const productArray = data.map(item =>{
                        return item.products
                    });
                   
                    const onlyProduct = productArray.map(item => {
                        const productId = []
                        for(var i = 0; i < item.length; i++){
                            if(item[i].quantity >= 10){
                                productId.push(item[i]._id)
                            }
                        }
                        return productId;
                    })
                
                    const filterProduct = onlyProduct.filter(item => item.length);

                  
            
                    const orderProductArray = [];
                    filterProduct.forEach(item => {
                        for(var i = 0; i < item.length; i++){
                            orderProductArray.push(item[i])
                        }
                    })
               
                    const uniqueProduct = [...new Set(orderProductArray)];
                 
                    callback(uniqueProduct);
                });
            }
            
            function lastFetch(uniqueProduct){
          
                fetch(`https://powerful-sierra-34042.herokuapp.com/product/${undefined}`)
                .then((res) => res.json())
                .then((data) => {
                
                    const popularProductList = [];
                    
                    data.forEach(product => {
                       
                        for(var i = 0; i < uniqueProduct.length ; i++) {
                            if(product._id === uniqueProduct[i]){
                                popularProductList.push( product );
                            }
                        }
                    })
                  
                    if(  popularProductList.length ){
                        onSuccess(popularProductList);
                    }
                    else{
                        onError("No popular product avaiable!");
                    }
           
                });
              
            }
            
            firstFetch(lastFetch);  
          
        }catch (e) {
            console.log(e);
          onError("Something went wrong: ", e);
        }
    })  
}

export default getPopularProduct;
