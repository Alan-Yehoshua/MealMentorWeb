import { makeArray } from '../../Logic/makeArray';
import './DialogUpdateRecipe.css'
import { updateDocID } from '../../Hooks/updateDocID'

/* eslint-disable react/prop-types */
export function DialogUpdateRecipe({recipe}){
    const handleSubmit = (event) =>{
        event.preventDefault();
        
        let ingredientsArray = makeArray(0,recipe.Ingredients.length,'Ing',event);
        let stepsArray = makeArray(0,recipe.Steps.length,'Stp',event);

        const fields = Object.fromEntries(new window.FormData(event.target));

        for(let i = 0; i<ingredientsArray.length;i++){
            delete fields['Ing'+i]
        }
        for(let i = 0; i<stepsArray.length;i++){
            delete fields['Stp'+i]
        }

        fields.Ingredients = ingredientsArray;
        fields.Steps = stepsArray;

        updateDocID(fields, 'Recipe',recipe.id);
    }

    return(
    <>
        <div className="Dialog-Update-Recipe">
            <form onSubmit={handleSubmit}>
            <section id="Top-Recipe-Update">
                <input defaultValue={recipe.Title} name="Title"/>
            </section>
            <section id="TopInfo-Recipe-Update">
                <div>
                    <label>Duracion:</label>
                    <input 
                    name='estimatedTime' 
                    type="number" 
                    defaultValue={recipe.estimatedTime}/>
                    <label>Dificultad:</label>
                    <input 
                    name="Difficulty"
                    type="number" 
                    defaultValue={recipe.Difficulty}/>
                </div>
                <div>
                    <label>Precio:</label>
                    <input 
                    name="Price"
                    type="number" 
                    defaultValue={recipe.Price}/>
                    <label>Calorias:</label>
                    <input 
                    name="Calories"
                    type="number" 
                    defaultValue={recipe.Calories}/>
                    <label>Horario:</label>
                    <input 
                    name='schedule' 
                    defaultValue={recipe.schedule}
                    multiple
                    list='options'/>
                    <datalist id='options'>
                        <option value='Desayuno'>Desayuno</option>
                        <option value='Comida'>Comida</option>
                        <option value='Cena'>Cena</option>
                    </datalist>
                </div>
            </section>
            <section id="Mid-Recipe-Update">
                <h3>Ingredientes: </h3>
                <ul className='UL-Recipe-Update'>
                    {recipe.Ingredients?.map((ingredients, index) => (
                        <li key={index}>
                           <input defaultValue={ingredients} name={'Ing'+index}/>
                        </li>
                    ))}
                </ul>
                <h3>Pasos: </h3>
                <ul className='UL-Recipe-Update'>
                    {recipe.Steps?.map((steps, index) => (
                        <li key={index}>
                            <input defaultValue={steps} name={'Stp'+index}/>
                        </li>
                    ))}
                </ul>
            </section>
            <section id="Bot-Recipe-Update">
                <input type='submit' value='Actualizar'/>
            </section>
            </form>
        </div>
    </>
    );
}