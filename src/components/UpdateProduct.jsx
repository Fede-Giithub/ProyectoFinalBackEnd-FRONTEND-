import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { URLBACKEND } from "../constants";


const UpdateBook = ({ book, onClose, onUpdate }) => {

  if (!book) return <p>Cargando libro...</p>;

  const [loader, setLoader] = useState(false)
  const [formData, setFormData] = useState({
    name: book.name,
    description: book.description,
    stock: Number(book.stock),
    price: Number(book.price),
    category: book.category,
    author: book.author
  })

  const { token } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataToUpdate = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    }

    try {
      setLoader(true)
      const response = await fetch(`${URLBACKEND}/books/${book._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dataToUpdate)
      })

      onUpdate()
      onClose()
    } catch (error) {
      console.log("Error al actualizar el objeto :(")
    } finally {
      setLoader(false)
    }
  }

  return (
    <section className="modal-overlay">
      <div className="modal-box">
        <h2>Editar libro</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
          />
          <input
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
          />
          <input
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
          />
          <button type="submit">{loader ? "Enviando..." : "Enviar"}</button>
        </form>
        <button className="close-btn" type="button" onClick={onClose}>Cancelar</button>
      </div>
    </section>
  )
}

export default UpdateBook