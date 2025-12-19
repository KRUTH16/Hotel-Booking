import SearchBar from '../components/SearchBar/SearchBar'
import RecentSearches from '../components/RecentSearches/RecentSearches'

export default function Home() {
  return (
    <main>
      <title>ASHRAYA</title>
      
      <section className="hero">
       
        <div className="container">
          
        <h1 className="Name">ASHRAYA</h1>
     
          <h1 className="Title">Book Hotels and Homestays</h1>
          <SearchBar />
          <RecentSearches />
        </div>
      </section>
    </main>
  )
}
