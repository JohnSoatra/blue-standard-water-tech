import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Admin = props => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [src, setSrc] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

  }
  const handleChangeName = event => {
    setName(event.target.value);
  }
  const handleChangePrice = event => {
    setPrice(event.target.value);
  }
  const handleChangeImg = event => {
    console.log(event.target.files[0])
  }
  return (<>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='name:' value={name} onChange={handleChangeName} />
      <br />
      <input type="number" placeholder='price:' step={0.01} value={price} onChange={handleChangePrice} />
      <br />
      <input type="file" placeholder='image' onChange={event => {
        const file = event.target.files[0];
        file.arrayBuffer().then(arb => {
          setSrc(file.name);
        })
      }} />
      <input type="submit" value="submit"/>
    </form>
    <img src={src} width={100} />
  </>);
}
 
export default Admin;