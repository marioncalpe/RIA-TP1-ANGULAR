import { Component } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tp1_angular';
}
  const [products, setProducts] = useState()
  const [searchProduct, setSearchProduct] = useState("");
  const [searchResults,  setSearchResults] = useState([]);
  const [checked, setChecked] = useState(false);
  useEffect(()=>{
    fetch("http://localhost/ria_api_php/")
    .then(request => request.json())
    .then(data => {
      setProducts(data.data)
      console.log(data)
      
    })
  },[])
  useEffect(()=>{
    if(products){
      const filtered = products.filter(product => {
        return product.nom.toLowerCase().includes(searchProduct.toLowerCase())
      })
      setSearchResults(filtered);
    }
  },[searchProduct, products])

  const handleChange = () => {
    setChecked(!checked);
  };
 
  const handlePriceChange = (e, productId) =>{
    console.log(e.target.value, productId)
    const newProducts = products.map(product=>{ 
      if(product.id === productId){
        const newProduct = {...product, dateUp: moment().format("YYYY-MM-DD HH-mm-ss"), prix: e.target.value} // ... extraction des propriétés : destructuring 
        fetch(`http://localhost/ria_api_php/${productId}`,{
          method: 'PATCH',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(newProduct)
        })
          .then(request => request.json())
          .then(data => {
        console.log(data)
      
    })
        return newProduct
      }
      return product
    })
    setProducts(newProducts)
  };
