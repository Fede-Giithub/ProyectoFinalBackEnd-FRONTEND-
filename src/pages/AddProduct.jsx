import { useState } from "react"
import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    author:""
  })

  const navigate = useNavigate()

  const { token } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataToSend = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    }

    console.log(token)

    try {
      const response = await fetch(`http://localhost:3000/books`, { //ACA CAMBIE EL ENDPOINT
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      })

      if (!response.ok) {
        alert("❌ Error al cargar el producto")
        return
      }

      alert("✅ Éxito al guardar el nuevo producto")
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        author:""
      })
      navigate("/")
    } catch (error) {

    }
  }

  const handleChange = (e) => {
    const nombreDeInput = e.target.name
    setFormData({ ...formData, [nombreDeInput]: e.target.value })
  }

  return (
    <Layout>
      <div className="page-banner">Agregar Nuevo Libro</div>

      <section className="page-section">
        <form className="form-container"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            minLength={3}
            maxLength={20}
            onChange={(e) => handleChange(e)}
            value={formData.name}
          />
          <input
            type="text"
            placeholder="Descripción"
            name="description"
            minLength={3}
            maxLength={200}
            onChange={(e) => handleChange(e)}
            value={formData.description}
          />
          <input
            type="number"
            placeholder="Precio"
            name="price"
            min={0}
            onChange={(e) => handleChange(e)}
            value={formData.price}
          />
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            min={0}
            onChange={(e) => handleChange(e)}
            value={formData.stock}
          />
          <input
            type="text"
            placeholder="Categoría"
            name="category"
            minLength={3}
            maxLength={20}
            onChange={(e) => handleChange(e)}
            value={formData.category}
          />
           <input
            type="text"
            placeholder="Author"
            name="author"
            minLength={3}
            maxLength={20}
            onChange={(e) => handleChange(e)}
            value={formData.author}
          />
          <button type="submit">Agregar</button>
        </form>
      </section>
    </Layout>
  )
}

export default AddProduct
