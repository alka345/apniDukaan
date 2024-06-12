import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDb, auth } from '../../firebase/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function MyState(props) {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)"
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = "white"
        }
    }

    const [loading, setLoading] = useState(false);

    
    const [currentUser, setCurrentUser] = useState({})
    // useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
            console.log(user);
        });
        // return ()=>{
        //     unsub()
        // }
    // },[])



    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const addProduct = async () => {
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
            return toast.error("all fields are required")
        }

        setLoading(true)

        try {
            const productRef = collection(fireDb, 'products');
            await addDoc(productRef, products)
            toast.success("Add product successfully");
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
        // setProducts("")


    }

    const [product, setProduct] = useState([]);

    const getProductData = async () => {

        setLoading(true)

        try {
            const q = query(
                collection(fireDb, 'products'),
                orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productArray);
                setLoading(false)
            });

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    useEffect(() => {
        getProductData();
    }, []);

    // update product function

    const edithandle = (item) => {
        setProducts(item)
    }

    const updateProduct = async () => {
        setLoading(true)
        try {

            await setDoc(doc(fireDb, 'products', products.id), products)
            toast.success("Product Updated successfully")
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    // delete product

    const deleteProduct = async (item) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDb, 'products', item.id))
            toast.success('Product Deleted successfully')
            getProductData();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDb, "order"))
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
                setLoading(false)
            });
            setOrder(ordersArray);
            console.log(ordersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [user, setUser] = useState([]);
   

    const getUserData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDb, "users"))
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setLoading(false)
            });
            setUser(usersArray);
            console.log(usersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getOrderData();
        getUserData();
    }, []);

    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')

    // Adding Testimonial


        /******************************************************************************************************************//**/
        const [reviews, setReviews] = useState({
            name: null,
            image: null,
            testimonial: null,
            time: Timestamp.now(),
            date: new Date().toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            )
        
          })
        
          // ********************** Add Review Section  **********************
          const addReview  = async () => {
            if (reviews.name == null ||reviews.image == null || reviews.testimonial == null) {
              return toast.error('Please fill all fields')
            }
            const reviewRef = collection(fireDb, "reviews")
            setLoading(true)
            try {
              await addDoc(reviewRef, reviews)
              toast.success("Review Add successfully")
              setTimeout(() => {
                window.location.href = '/testimonial'
            }, 800);
              getReviewData()
            //   closeModal()
              setLoading(false)
            } catch (error) {
              console.log(error)
              setLoading(false)
            }
            setReviews("")
          }
        
          const [review, setReview] = useState([]);
        
          // ****** get review******//
          const getReviewData = async () => {
            setLoading(true)
            try {
              const q = query(
                collection(fireDb, "reviews"),
                orderBy("time"),
                // limit(5)
              );
              const data = onSnapshot(q, (QuerySnapshot) => {
                let reviewsArray = [];
                QuerySnapshot.forEach((doc) => {
                  reviewsArray.push({ ...doc.data(), id: doc.id });
                });
                setReview(reviewsArray)
                setLoading(false);
              });
              return () => data;
            } catch (error) {
              console.log(error)
              setLoading(false)
            }
          }
        
          useEffect(() => {
            getReviewData();
          }, []);

        
        //Provide a context value to component tree
        return (
        <MyContext.Provider value={{
            mode, toggleMode, loading, setLoading,
            products, setProducts, addProduct, product,
            reviews, setReviews, review, setReview, addReview,
            edithandle, updateProduct, deleteProduct, order,
            user, searchkey, setSearchkey,filterType,setFilterType,
            filterPrice,setFilterPrice, currentUser
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState