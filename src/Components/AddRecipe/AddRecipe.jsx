import "./AddRecipe.css"

//import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { dataBase } from '../../DataBase/Firebase';
import { collection, addDoc } from "firebase/firestore"

import { TopLogo } from '../Misc/TopLogo'
import { Navigation } from '../Misc/Navigation'
import { RowIngredients } from "./RowIngredients"
import { RowSteps } from "./RowSteps"

import { useState, useRef } from "react"
import { UpImage } from "./UpImage";

const defaultState = {
    Ingredients: [''],
    Steps: ['']
}

export function AddRecipe(){
    const [rows, setRows] = useState([defaultState]);
    const [rowsSteps, setRowsSteps] = useState([defaultState]);
    const [image, setImageUrl] = useState(null);
    const form = useRef()

    const handleOnChange = (index, name, value) => {
        const copyRows = [...rows];
        copyRows[index] = {
          ...copyRows[index],
          [name]: value
        };
        setRows(copyRows);
      };
    
      const handleOnAdd = () => {
        setRows(rows.concat(defaultState));
      };
    
      const handleOnRemove = index => {
        const copyRows = [...rows];
        copyRows.splice(index, 1);
        setRows(copyRows);
      };
      
      //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX////

      const handleOnChangeSteps = (index, name, value) => {
        const copyRows = [...rowsSteps];
        copyRows[index] = {
          ...copyRows[index],
          [name]: value
        };
        setRowsSteps(copyRows);
      };
    
      const handleOnAddSteps = () => {
        setRowsSteps(rowsSteps.concat(defaultState));
      };
    
      const handleOnRemoveSteps = index => {
        const copyRows = [...rowsSteps];
        copyRows.splice(index, 1);
        setRowsSteps(copyRows);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new window.FormData(event.target));
        const rowIngredients = rows.map(row => row.Ingredients);
        const rowSteps = rowsSteps.map(row => row.Steps);
        fields.Ingredients = rowIngredients;
        fields.Steps = rowSteps;
        fields.imageUrl = image;
        
        const addCustomerRef = collection(dataBase, 'Recipe');
        addDoc(addCustomerRef, fields)
        .then(() => {
          alert('Receta añadida correctamente');
          form.current.reset();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    };


    //TODO: Añadir le funcion de mandar la base de datos

    return(
        <>
        <TopLogo/>
        <div className="Addrecipe-Div">
            <div className="Box">
                <Navigation/>
                <section className="Recipe-Box">
                    <form className="Recipe-Form" onSubmit={handleSubmit} ref={form}>
                        <div className="Top-Recipe">
                            <section>
                                <input 
                                name='Title'
                                type="text" 
                                required 
                                placeholder="Titulo de la receta"/>
                            </section>
                            <section className="Top-Info">
                                <label>Duracion:</label>
                                <input 
                                name='estimatedTime' 
                                type="number" 
                                required 
                                placeholder="Duracion"/>
                                <label>Dificultad:</label>
                                <input 
                                name="Difficulty"
                                type="number" 
                                required 
                                placeholder="Dificultad"/>
                            </section>
                            <section className="Top-Info">
                                <label>Precio:</label>
                                <input 
                                name="Price"
                                type="number" 
                                required 
                                placeholder="Precio"/>
                                <label>Calorias:</label>
                                <input 
                                name="Calories"
                                type="number" 
                                required 
                                placeholder="Calorias"/>
                                <label>Horario:</label>
                                <input 
                                name='schedule' 
                                placeholder='Horario'
                                multiple
                                list='options'
                                required/>
                                <datalist id='options'>
                                    <option value='Desayuno'>Desayuno</option>
                                    <option value='Comida'>Comida</option>
                                    <option value='Cena'>Cena</option>
                                </datalist>
                                </section>
                        </div>
                        <div className="Ingredients">
                        <label>Ingredientes:</label><br/>
                        {rows.map((row, index) => (
                            <RowIngredients
                            {...row}
                            onChange={(name, value) => handleOnChange(index, name, value)}
                            onRemove={() => handleOnRemove(index)}
                            key={index}
                            />
                        ))}
                        <input 
                        onClick={handleOnAdd} 
                        type="button" 
                        value='Agregar'
                        className="add-button"
                        />
                        </div>
                        <div className="Preferences">
                        <label>Pasos:</label><br/>
                        {rowsSteps.map((row, index) => (
                            <RowSteps
                            {...row}
                            onChange={(name, value) => handleOnChangeSteps(index, name, value)}
                            onRemove={() => handleOnRemoveSteps(index)}
                            key={index}
                            />
                        ))}
                        <input 
                        onClick={handleOnAddSteps} 
                        type="button" 
                        value='Agregar'
                        className="add-button"
                        />
                        </div>
                        <input 
                        className="add-recipe" 
                        type="submit" 
                        value="Añadir"
                        />
                    </form>
                </section>
                <section className="Image-Recipe">
                          <UpImage setImageUrl={setImageUrl}/>
                        </section>
            </div>
        </div>
        </>
    )
}