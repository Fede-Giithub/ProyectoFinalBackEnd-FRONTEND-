import Layout from "../components/Layout"

const AboutUs = () => {
  return (
    <Layout>
      <div className="page-banner">Sobre Nosotros</div>

      <section className="page-section">
        <h2>Nuestra Historia</h2>
        <p>
          Somos una librería apasionada por el mundo de los libros y el conocimiento. 
          Desde nuestros inicios, trabajamos para acercar historias, ideas y experiencias 
          a lectores de todas las edades.
        </p>

        <h2>Misión</h2>
        <p>
         Promover la lectura y la cultura, brindando un espacio donde lectores
        </p>

        <h2>Visión</h2>
        <p>
          Convertirnos en referentes del sector a nivel nacional e internacional.
        </p>
      </section>
    </Layout>
  )
}

export default AboutUs
