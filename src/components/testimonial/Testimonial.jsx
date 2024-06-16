import React, { useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import { Link } from 'react-router-dom';
import { GrStarOutline, GrStar } from "react-icons/gr";

function Testimonial() {
    const context = useContext(myContext);
    const { mode, review, currentUser } = context;
    console.log(review);

    // Initialize the ratings array with the same length as the review array
    const initialRatings = review.map(() => 0);
    const [ratings, setRatings] = useState(initialRatings);

    const ratingGiven = (index, rating) => {
        const newRatings = [...ratings];
        newRatings[index] = rating + 1; // Set rating to the selected star (1-based index)
        setRatings(newRatings);
    };

    return (
        <div>
            <section>
                <div className="container mx-auto px-5 py-10">
                    <h1 className='text-center text-3xl font-bold text-black' style={{ color: mode === 'dark' ? 'white' : '' }}>Testimonial</h1>
                    <h2 className='text-center text-2xl font-semibold mb-10' style={{ color: mode === 'dark' ? 'white' : '' }}>What our <span className='text-pink-500'>customers</span> are saying</h2>
                    <div className='flex justify-center flex-wrap'>
                        {review.map((item, index) => {
                            const { name, image, testimonial } = item;
                            return (
                                <div className="lg:w-1/3 lg:mb-0 mb-6 p-4 flex" key={index}>
                                    <div className="h-full text-center bg-slate-300 p-11 rounded-2xl">
                                        <div className='flex'>
                                            <p>
                                                <img className='h-10 w-10 rounded-full' src={image} alt="CurrentUserImage" />
                                            </p>
                                            <h3 className='flex justify-between text-gray-900 font-bold py-1 pl-6 title-font tracking-wider text-xl uppercase'>{name}</h3>
                                            {[...Array(5)].map((star, starIndex) => (
                                                <button key={starIndex} onClick={() => ratingGiven(index, starIndex)}>
                                                    {starIndex < ratings[index] ? <GrStar /> : <GrStarOutline />}
                                                </button>
                                            ))}
                                            <p className='ml-4'>{ratings[index]} Rating</p>
                                        </div>
                                        <span className="inline-block h-1 w-full rounded bg-pink-500 mt-6 mb-4" />
                                        <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed text-gray-500">
                                            {testimonial}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <Link to='/addtestimonial'>
                        <button className='flex mx-auto bg-slate-300 text-black px-5 py-3 rounded-xl'>Add Review</button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Testimonial;
