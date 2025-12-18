import SearchBar from '../components/SearchBar/SearchBar'

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1 className="Title">Book Hotels and Homestays</h1>
          <SearchBar />
        </div>
      </section>
    </main>
  )
}
