import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const paginationArr = []

  useEffect(() => {
    fetch(`https://judazorapp.herokuapp.com/movies?page=${page}&limit=${limit}`)
    .then(res => res.json())
    .then(data => {
      setMovies(data.movies)
      setPages(data.pages)
    })
  }, [limit, page])

  for(let i = 1; i <= pages; i++) {
    paginationArr.push(i)
  }

  return (
    <div className="App">
      <h1>
        Salom Dunyo
      </h1>

      <select onChange={e => setLimit(e.target.value)}>
        <option value={10}>
          10
        </option>      
        <option value={15}>
          15
        </option>      
        <option value={20}>
          20
        </option>
      </select>

      <div className='wrapper'>
        {
          movies?.map((m, i) => {
            return(
              <>
                <div className='div' key={i + 1}>
                  <h4>
                    {m.film_id}) 
                     {m.film_title}
                  </h4>
                  <p>
                    {m.film_genre}
                  </p>
                </div>
              </>
            )
          })
        }
      </div>

        <div className='btn_wrapper'>
    
          {
            paginationArr.length > 0 && paginationArr?.map(e => {
              return(
                <button style={{border: page == e ? "3px solid black" : "none"}} key={e} id={e} onClick={e => setPage(e.target.id)}> 
                  {e}
                </button>
              )
            })
          }

        </div>
    </div>
  );
}

export default App;
