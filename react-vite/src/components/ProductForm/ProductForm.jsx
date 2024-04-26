import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductForm.css"
import { NavLink, useNavigate } from "react-router-dom"
import { FaCamera } from "react-icons/fa";


function ProductForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [catagory, setCatagory] = useState()
    const [previewImg, setPreviewImg] = useState()
    const [imageLoading, setImageLoading] = useState(false);
    const [error, setError] = useState({})

    const currentUser = useSelector(state => state.session['user'])

    useEffect(() => {
        if (!currentUser) navigate('/')
    }, [navigate, currentUser])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setImageLoading(true)

        const formData = new FormData()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('catagory', catagory)
        formData.append('preview_img', previewImg)

        setImageLoading(false)
        setError({})

        // dispatch() dispactch add product

    }

    useEffect(() => {
        const errObj = {}
        if (!name.length) errObj.name = 'Name Required'
        if (!description.length) errObj.description = 'Description Required'
        if (!price) errObj.price = 'Price Required'
        if (!catagory) errObj.catagory = 'Catagory Required'
        if (!previewImg) errObj.previewImg = "Preview image required"

    }, [name, description, price, catagory, previewImg])

    return (
        <div className='ProductForm'>
            <form className="add-product" onSubmit={handleSubmit}>
                <h1>Add Product</h1>

                <div className="left-image-div">
                    <label>
                        <FaCamera />
                        Upload image
                        <input type="file" name="previewImg" onChange={(e) => setPreviewImg(e.target.files[0])} accept="image/*" />
                    </label>
                    {error.previewImg && <h5>{error.previewImg}</h5>}
                </div>

                <div className="right-data-fill-div">
                    <label>
                        Name:
                        <input type="text" name="name" placeholder={"name"} value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    {error.name && <h5>{error.name}</h5>}
                    <br />

                    <label>
                        Description:
                        <input type="text" name="description" placeholder={"description"} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    {error.description && <h5>{error.description}</h5>}
                    <br />

                    <label>
                        Price:
                        <input type="text" name="price" placeholder={"price"} value={price} onChange={(e) => setPrice(e.target.value)} />
                    </label>
                    {error.price && <h5>{error.price}</h5>}
                    <br />

                    <label htmlFor="catagory">Choose a Catagory:
                    <select name="catagory" id="catagory" onChange={(e) => setCatagory(e.target.value)}>
                        <option value="statues">Statues</option>
                        <option value="paintings">Paintings</option>
                        <option value="bags">Bags</option>
                        <option value="clothings">Clothings</option>
                        <option value="souvenirs">Souvenirs</option>
                    </select>
                    </label>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
