import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { MdLocalMovies } from 'react-icons/md'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import Modal from '../ui/modal/Modal'
import axios from 'axios'

const Movie = ({ item }) => {
    const IMDB_URL = 'https://image.tmdb.org/t/p/w500'
    const { user } = UserAuth()

    const [like, setLike] = useState(false)
    const [saved, setSaved] = useState(false)

    const movieID = doc(db, 'users', `${user?.email}`)

    const saveShow = async () => {
        if (user?.email) {
            setLike(!like)
            setSaved(true)
            await updateDoc(movieID, {
                saveShow: arrayUnion({
                    id: item.id,
                    title: item.title,
                    img: item.backdrop_path,
                }),
            })
        } else {
            alert('Please log in to save a movie!')
        }
    }

    const [isOpen, setIsOpen] = useState(false)
    const [trailersMovie, setTrailersMovie] = useState([])

    const handleOpenModal = (id) => {
        setIsOpen(true)

        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}`,
            params: { language: 'en-US' },
        }

        axios
            .request(options)
            .then(function (response) {
                setTrailersMovie(response.data)
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }


    return (
        <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
            <img
                className="w-full h-auto block"
                src={`${IMDB_URL}/${item?.backdrop_path}`}
                alt={item.title}
            />
            <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full">
                    {item?.title}
                </p>
                <p onClick={saveShow}>
                    {like ? (
                        <FaHeart className="absolute top-4 left-4 text-gray-300" />
                    ) : (
                        <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
                    )}
                </p>
                <p onClick={() => handleOpenModal(item?.id)}>
                    <MdLocalMovies className="absolute top-4 left-10 text-gray-300" />
                </p>
                <div>
                    <Modal isOpen={isOpen} onClose={handleCloseModal}>
                        <div className="relative z-50 mb-5">
                            <h2 className="text-2xl font-bold text-black">
                                Trailer: "{item?.title}"
                            </h2>
                            <h2 className="text-2xl font-bold text-black">
                                Ratings: {item?.vote_average} &#11088;
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {trailersMovie?.results?.map(
                                    (trailer, index) => (
                                        <div
                                            key={index}
                                            className="w-full h-full"
                                        >
                                            <iframe
                                                className="absolute mt-10 top-8 left-0 w-full h-full"
                                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                                title={`Trailer ${index + 1}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{
                                                    width: '550px',
                                                    height: '350px',
                                                }}
                                                key={index}
                                            ></iframe>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Movie
