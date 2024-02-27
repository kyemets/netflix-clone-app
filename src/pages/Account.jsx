import React from 'react'
import SavedShows from '../components/SavedShows'

const Account = () => {
    return (
        <>
            <div className="w-full text-white">
                <img
                    className="w-full h-[400px] object-cover"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/a122d560-1de8-43b7-961b-2e6ea5d03ecd/SK-en-20240219-popsignuptwoweeks-perspective_alpha_website_small.jpg"
                    alt="logo"
                />
                <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]">
                    <div className="absolute top-[20%] p-4 md:p-8">
                        <h1 className="text-3xl md:text-5xl font-bold">
                            My Shows
                        </h1>
                    </div>
                </div>
            </div>
            <SavedShows />
        </>
    )
}

export default Account
