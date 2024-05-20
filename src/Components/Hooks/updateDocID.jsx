import { doc, updateDoc } from 'firebase/firestore';
import { dataBase } from '../../DataBase/Firebase';

export const updateDocID  = async (newData, collection, ID) =>{
    try {
        const docRef = doc(dataBase, collection, ID);
        await updateDoc(docRef, newData);
        alert('Actualizado correctamente');
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}