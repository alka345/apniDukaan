import React, { useContext } from 'react'
// import myContext from '../../../context/data/myContext'
import myContext from '../../context/data/myContext';
import { Link } from 'react-router-dom';

function AddTestimonial() {
    const context = useContext(myContext);
    const { reviews, setReviews, addReview, currentUser } = context;
    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Review</h1>
                    </div>
                    <div>
                        <input type="text"
                            value={reviews.name}
                            // value={currentUser.displayName}
                            onChange={(e) => setReviews({ ...reviews,name : e.target.value })}
                            name='name'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Name '
                        />
                    </div>
                    <div>
                    
                    </div>
                    <div>
                        <input type="text"
                            value={reviews.image}
                            onChange={(e) => setReviews({ ...reviews, image: e.target.value })}
                            name='image'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Review image'
                        />
                    </div>
                    <div>
                    
                    </div>
                    <div>
                        <textarea cols="30" rows="10" name=''
                         value={reviews.testimonial}
                         onChange={(e) => setReviews({ ...reviews, testimonial: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Review desc'>

                        </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                      <Link to="/testimonial"><button
                        onClick={addReview}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Add Review
                        </button></Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddTestimonial