import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'
import { Link } from 'react-router-dom';


function Testimonial() {
    const context = useContext(myContext);
    const { mode, review, currentUser } = context;
    console.log(review);
    return (
        <div>
            <section>
                <div className=" container mx-auto px-5 py-10 ">
                    <h1 className=' text-center text-3xl font-bold text-black' style={{ color: mode === 'dark' ? 'white' : '' }}>Testimonial</h1>
                    <h2 className=' text-center text-2xl font-semibold mb-10' style={{ color: mode === 'dark' ? 'white' : '' }}>What our <span className=' text-pink-500'>customers</span> are saying</h2>
                    <div className='flex justify-center flex-wrap '>
                    {review.map((item, index)=>{
                        const {name, image, testimonial } = item;
                        
                        return(
                            
                            // <div className="flex flex-wrap -m-4">
                            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4 flex">
                            <div className="h-full text-center  bg-slate-300 p-11 rounded-2xl">
                                <div className='flex'>
                                <p ><img
                                className='h-10 w-10 rounded-full'
                                src={currentUser.photoURL} alt="CurrentUserImage" /></p>
                                    <h3 className='flex justify-between text-gray-900 font-bold py-1 pl-6 title-font tracking-wider text-xl uppercase'>{currentUser.displayName}</h3> 
                                    </div>
                                {/* <img alt="testimonial" className="w-50 h-50 mb-8 object-cover object-center  inline-block border-2 border-gray-200 bg-gray-700" src={image}/> */}
                                {/* <h2 style={{ color: mode === 'dark' ? '#ff4162' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">{name}</h2> */}
                                <span className="inline-block h-1 w-full rounded bg-pink-500 mt-6 mb-4" />
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed text-gray-500">
                                    {testimonial}
                                    </p>
                                {/* <p style={{ color: mode === 'dark' ? 'white' : '' }} className="text-gray-500">{ time }</p> */}
                            </div>
                        </div>
                        
                        
                        // </div>
                        )
                        })}
                    </div>
                    <Link to='/addtestimonial'><button className='flex mx-auto bg-slate-300 text-black px-5 py-3 rounded-xl'>Add Review</button></Link>
                </div>
            </section>
        </div>
    )
}

export default Testimonial