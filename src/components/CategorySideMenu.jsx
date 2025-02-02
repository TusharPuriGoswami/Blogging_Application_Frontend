import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loadAllCategories } from '../services/category-service';

function CategorySideMenu() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAllCategories()
      .then(data => {
        console.log('Loading categories...');
        setCategories([...data]);
      })
      .catch(error => {
        console.error(error);
        toast.error('Error in loading categories!');
      });
  }, []);

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    navigate(selected === 'all' ? '/' : `/categories/${selected}`);
  };

  return (
    <div>
      <label htmlFor="categorySelect" className="form-label">
        Select Category
      </label>
      <select
        id="categorySelect"
        className="form-select border-0 shadow-0 mt-1"
        onChange={handleCategoryChange}
      >
        <option value="all">All Blogs</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat.categoryId}>
            {cat.categoryTitle}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategorySideMenu;


// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { ListGroup, ListGroupItem } from 'reactstrap'
// import { loadAllCategories } from '../services/category-service'

// function CategorySideMenu() {

//   const [categories , setCategories] = useState([])
//   useEffect(()=>{
//     loadAllCategories().then(data=>{
//       console.log("loading categories..");
//       console.log(data);
      
//       setCategories([...data])
//     }).catch(error => {
//       console.error(error)
//       toast.error("Error in Loading categories!!")
//     })
//   },[])
 

//   return (
//    <div>
//    <ListGroup>
//     <ListGroupItem  tag={Link} to="/" action={true} className='border-0'>
//         All Blogs
//     </ListGroupItem>
//     {
//       categories && categories.map((cat,index)=>{
//         return(
//           <ListGroupItem className='border-0 shadow-0 mt-1' key={index} action={true}>
//             {cat.categoryTitle}
//           </ListGroupItem>
//         )
//       })
//     }
    
//    </ListGroup>
//    </div>
//   )
// }

// export default CategorySideMenu