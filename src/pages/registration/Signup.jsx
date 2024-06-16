import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, fireDb, storage } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FaCameraRetro } from "react-icons/fa6";


function Signup() {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const signup = async () => {
        setLoading(true);
        if (!displayName || !email || !password || !profileImage) {
            toast.error("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, profileImage);

            uploadTask.on('state_changed', 
                () => {},
                (error) => {
                    console.error(error);
                    setLoading(false);
                }, 
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await updateProfile(users.user, {
                        displayName,
                        photoURL: downloadURL
                    });

                    const user = {
                        user: displayName,
                        uid: users.user.uid,
                        email: users.user.email,
                        time: Timestamp.now()
                    };
                    const userRef = collection(fireDb, "users");
                    await addDoc(userRef, user);

                    toast.success("Signup Successfully");
                    setDisplayName("");
                    setEmail("");
                    setPassword("");
                    setProfileImage(null);
                    setLoading(false);
                }
            );
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                <div>
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        name='displayName'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>

                <div>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div>
                    <input 
                        style={{ display: 'none' }}
                        type="file"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                        id="file"
                    />
                    <label htmlFor="file" className=' text-white rounded-lg cursor-pointer'>
                    <p className=''><FaCameraRetro /> </p>
                    </label>
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        onClick={signup}
                        className='bg-red-500 w-full text-white font-bold px-2 py-2 mt-2 rounded-lg'>
                        Signup
                    </button>
                    <br />
        
                </div>
              
                <div>
                    <h2 className='text-white'>Have an account? <Link className='text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    );
}

export default Signup;
