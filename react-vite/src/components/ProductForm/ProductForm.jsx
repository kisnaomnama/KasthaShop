
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductForm.css"
import { useNavigate } from "react-router-dom"
import { FaCamera } from "react-icons/fa";
import { createProductThunk } from "../../redux/product";
// import { ToastContainer, toast } from "react-toastify"

function ProductForm({product, FormType}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [category, setCategory] = useState()
    const [product_image, setProduct_image] = useState()
    const [imageLoading, setImageLoading] = useState(false);
    const [error, setError] = useState({})
    const [showImage, setShowImage] = useState()
    // const [product_image, setPreviewUrl] = useState(null);

    const currentUser = useSelector(state => state.session['user'])
    const categories = ["Thanka Paintings", "Budda Statues", "Singings Bowls", "Prayer Flags", "Prayer Wheels", "Gifts etc"]


    useEffect(() => {
        if (!currentUser) navigate('/')
    }, [navigate, currentUser])


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProduct_image(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setShowImage(reader.result)
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setImageLoading(true)

        const formData = new FormData()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('product_image', product_image)

        setImageLoading(false)
       

        // dispatch(createProductThunk(formData)).then(newProduct => {
        //     toast.success("Successfully uploaded song", {
        //         onClose: () => navigate(`/`)
        //     })
        // })  

       const newProduct = await dispatch(createProductThunk(formData))    
       if(newProduct.errors){
        setError(newProduct.errors)
       }
       else{
           navigate(`/products/${newProduct.id}`)
       }
        // navigate(`/products/${newProduct.id}`)     
    }

    useEffect(() => {
        const errObj = {}

        if (!name.length) errObj.name = 'Name Required'
        if (!description.length) errObj.description = 'Description Required'
        if (!price) errObj.price = 'Price Required'
        if (!category) errObj.category = 'Category Required'
        if (!product_image) errObj.product_image = "Preview image required"

        setError(errObj);
    }, [name, description, price, category, product_image]);

    return (
        <div className='ProductForm-wrapper'>
            <h1>Add Product</h1>
       
            <form className="add-product-form" onSubmit={handleSubmit}>

                <div className="left-image-div">
                <p className = "file-type">Accepted formats: PDF, PNG, JPG, JPEG, GIF</p>

                    <label>
                        <FaCamera />
                        Upload image
                        <input
                            type="file"
                            name="product_image"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </label>

                    <div className="image-preview-div">
                        {showImage && <img src={showImage} alt="Preview" />}
                    </div>
                    <div className="error-message" id="product_image-error">
                        {error.product_image && <p>{error.product_image}</p>}
                    </div>

                </div>

                <div className="right-data-fill-div">
                    <label>
                        Name:
                        <input type="text"
                            name="name"
                            placeholder={"name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)} />

                    </label>
                    <div className="error-message" id="name-error">
                        {error.name && <p>{error.name}</p>}
                    </div>
                    <br />

                    <label>
                        Description:
                        <input type="text" name="description" placeholder={"description"} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <div className="error-message" id="description-error">
                        {error.description && <p>{error.description}</p>}
                    </div>
                    <br />

                    <label>
                        Price:
                        <input type="text" name="price" placeholder={"price"} value={price} onChange={(e) => setPrice(e.target.value)} />
                    </label>
                    <div className="error-message" id="price-error">
                        {error.price && <p>{error.price}</p>}
                    </div>

                    <br />

                    <label htmlFor="category">Choose a Category:
                        <select name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </label>
                    <div className="submit-div">
                        <button type="submit" disabled={Object.values(error).length > 0}>Submit</button>
                        {(imageLoading) && <p>Loading...</p>}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
