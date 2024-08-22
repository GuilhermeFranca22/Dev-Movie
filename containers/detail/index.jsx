/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Container, Background, Cover, Info, ContainerMovies } from "./styles"
import { getMovieById, getMovieCredits, getMovieSimilar, getMovieVideos } from "../../services/getData"
import { useParams } from "react-router-dom"
import { getImages } from "../../utils/getImages"
import SpanGenres from "../../components/spangenres"
import Credits from "../../components/credits"
import  Slider  from "../../components/slider"


function Detail() {
    const [movie, setMovie] = useState()
    const [movieVideos, setMovieVideos] = useState()
    const [movieCredits, setMovieCredits] = useState()
    const [movieSimilar, setMovieSimilar] = useState()

    const { id } = useParams()

    useEffect(() => {
        async function getAllData() {
            Promise.all([
                getMovieById(id),
                getMovieVideos(id),
                getMovieCredits(id),
                getMovieSimilar(id)
            ])
                .then(([movie, videos, credits, similar]) => {
                    setMovie(movie)
                    setMovieVideos(videos)
                    setMovieCredits(credits)
                    setMovieSimilar(similar)
                })
                .cath((error) => console.error(error))
        }

        getAllData()
    })

    return (
        <>
            {movie && ( 
            <>
                <Background image={getImages(movie.backdrop_path)}/> 
                <Container>
                    <Cover>
                        <img src={getImages(movie.poster_path)} />
                    </Cover>
                    <Info>
                        <h2>{movie.title}</h2>
                        <SpanGenres genres={movie.genres}/>
                        <p>{movie.overview}</p>
                        <div>
                            <Credits credits={movieCredits}/>
                        </div>
                    </Info>
                </Container>
                <ContainerMovies>
                    {movieVideos && movieVideos.map( video => (
                        <div key={video.id}>
                            <h4>{video.name}</h4>
                            <iframe src={`https://www.youtube.com/embed/${video.key}`} title="Youtube Video Player" height="500px" width="100%"></iframe>
                        </div>
                    ))}
                </ContainerMovies>
                {movieSimilar && <Slider info={movieSimilar} title={'Filmes Similares'} />}
            </>
            )}
        </>
    )
}

export default Detail