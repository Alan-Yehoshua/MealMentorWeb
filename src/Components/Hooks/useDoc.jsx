/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getDoc, doc } from "firebase/firestore"

export function useDoc(dataBase, collection, ID, setLoading){
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const docRef = doc(dataBase, collection, ID);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data());
                    setLoading(false);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        })();
    }, []);

    return {data: data, loading: setLoading}
}