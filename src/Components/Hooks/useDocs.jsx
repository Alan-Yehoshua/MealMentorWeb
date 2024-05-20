import { collection, getDocs } from "firebase/firestore"
import { useState, useEffect } from 'react';

export function useDocs(dataBase, collections, setLoading){
    const [data, setData] = useState(null);
    useEffect(() => {
        setLoading(true);
        const customerRef = collection(dataBase, collections)
        getDocs(customerRef)
        .then((resp) => {
            setData(
                resp.docs.map((doc) => {
                    return {...doc.data() , id: doc.id}
            })
        )
        setLoading(false);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {data: data, loading: setLoading}
}