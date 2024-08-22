
import Button from '../../components/button'
import Modal from '../../components/modal'
import Slider from '../../components/slider'

import { getCinemaMovies, getMovies, getPeopleList, getPopularMovies, getPopularSeries, getTopMovies, getTopSeries } from '../../services/getData'
import { getImages } from '../../utils/getImages'
import { Background, Info, Poster, Container, ContainerButtons } from './styles'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Home(){
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovies] = useState()
    const [topMovies, setTopMovies] = useState()
    const [topSeries, setTopSeries] = useState()
    const [cinemaMovies, setCinemaMovies] = useState()
    const [popularMovies, setPopularMovies] = useState()
    const [popularSeries, setPopularSeries] = useState()
    const [peopleList, setPeopleList] = useState()
    const navigate = useNavigate()
    

    useEffect(() => {
        //async function getAllData() {
            
    
            //setMovie(await getMovies())
            //setTopMovies(await getTopMovies())
            //setTopSeries(await getTopSeries())
            //setCinemaMovies(await getCinemaMovies())
            //setPopularMovies(await getPopularMovies())
            //setPopularSeries(await getPopularSeries())
            //setPeopleList(await getPeopleList())
        //}

        async function getAllData() {
            
            Promise.all([
                getMovies(),
                getTopMovies(),
                getTopSeries(),
                getCinemaMovies(),
                getPopularMovies(),
                getPopularSeries(),
                getPeopleList()
            ])
                .then(([movie, topMovies, topSeries, cinemaMovies, popularMovies, popularSeries, peopleList]) => {
                    setMovies(movie)
                    setTopMovies(topMovies)
                    setTopSeries(topSeries)
                    setCinemaMovies(cinemaMovies)
                    setPopularMovies(popularMovies)
                    setPopularSeries(popularSeries)
                    setPeopleList(peopleList)
                })
                .catch( error => console.error(error))
        }
       
        getAllData()
    }, [])
    

    return (
        <>
        {movie && (
        <Background img={getImages(movie.backdrop_path)}>
            {showModal && <Modal movieId={movie.id} setShowModal={setShowModal} />}
            <Container>
                <Info>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <ContainerButtons>
                        <Button red onClick={() => navigate(`/detalhe/${movie.id}`)}>Assista Agora</Button>
                        <Button onClick={() => setShowModal(true)}>Assista o Trailer</Button>
                    </ContainerButtons>
                </Info>
                <Poster>
                    <img alt="capa-do-filme" src={getImages(movie.poster_path)}/>
                </Poster>
            </Container>
        </Background>
        )}
        {topMovies && <Slider info={topMovies} title={'Top Filmes'} />}
        {topSeries && <Slider info={topSeries} title={'Top Séries'} />}
        {cinemaMovies && <Slider info={cinemaMovies} title={'Filmes no Cinema'} />}
        {popularMovies && <Slider info={popularMovies} title={'Filmes Populares'} />}
        {popularSeries && <Slider info={popularSeries} title={'Séries Populares'} />}
        {peopleList && <Slider info={peopleList} title={'Artistas mais Populares'} />}
        </>
    )
}

export default Home  