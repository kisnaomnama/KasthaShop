
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./ProductForm.css"
import { useNavigate } from "react-router-dom"
import { FaCamera } from "react-icons/fa";
import { editProductThunk } from "../../redux/product";


function EditProductForm({ product }) {
    console.log(product)
    const productId = product.id
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [category, setCategory] = useState(product.category || "");
    const [product_image, setProduct_image] = useState()
    const [imageLoading, setImageLoading] = useState(false);
    const [error, setError] = useState({})
    const [showImage, setShowImage] = useState()

    useEffect(() => {
        if (product) {
            setName(product.name || "");
            setDescription(product.description || "");
            setPrice(product.price || "");
            setCategory(product.category || "");
            setShowImage(product.product_image || "");
        }
    }, [product]);


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

        setProduct_image(file)
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

        const newProduct = await dispatch(editProductThunk(formData, productId))
        if (newProduct.errors) {
            setError(newProduct.errors)
        }
        else {
            navigate(`/products/${newProduct.id}`)
        }
    }

    useEffect(() => {
        const errObj = {}

        if (!name.length) errObj.name = 'Name Required'
        if (!description.length) errObj.description = 'Description Required'
        if (!price) errObj.price = 'Price Required'
        if (price <= 0) error.Obj = 'Price must be greater than 0'
        if (price > 10000) error.Obj = 'Price must be smaller than or equal to 10,000'
        if (!category) errObj.category = 'Category Required'
        if (!product_image && !showImage) errObj.product_image = "Preview image required"

        setError(errObj);
    }, [name, description, price, category, product_image, showImage, error]);

    return (
        <div className='ProductForm-wrapper'>
            <h1>Edit Product</h1>

            <form className="add-product-form" onSubmit={handleSubmit}>
                <div className="left-image-div">
                    <p className="file-type">Accepted formats: PDF, PNG, JPG, JPEG, GIF</p>

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
                    <label htmlFor="category">
                        Choose a Category:
                        <select
                            name="category"
                            id="category"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        >
                            <option value="Thanka Paintings">Thanka Paintings</option>
                            <option value="Budda Statues">Budda Statues</option>
                            <option value="Singings Bowls">Singings Bowls</option>
                            <option value="Prayer Flags">Prayer Flags</option>
                            <option value="Prayer Wheels">Prayer Wheels</option>
                            <option value="Gifts etc">Gifts etc</option>
                        </select>
                    </label>

                    <div className="submit-div">
                        <button type="submit" disabled={Object.values(error).length > 0}>Update</button>
                        {(imageLoading) && <p>Loading...</p>}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditProductForm;
