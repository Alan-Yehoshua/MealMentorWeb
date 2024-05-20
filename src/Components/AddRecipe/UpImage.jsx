import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { dataBaseStorage } from '../../DataBase/Firebase';
import './UpImage.css'


// eslint-disable-next-line react/prop-types
export function UpImage({setImageUrl}){
    const [image, setImage] = useState(null);
    const storage = dataBaseStorage;

    const handleUpload = async (e) => {
      const file = e.target.files[0];
      const storageRef = ref(storage, file.name);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      setImage(imageUrl);
      setImageUrl(imageUrl);
    };

    return (
      <div id='divImgRecipe'>
        {
        image != null ? <img src={image} alt="Imagen Subida" id='imgRecipe'/>
        : 
        <input type="file" onChange={handleUpload} id='inputImgRecipe' name='imgRecipeUrl'/>
        }
      </div>
    );
}