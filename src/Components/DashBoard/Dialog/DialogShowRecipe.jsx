import './DialogShowRecipe.css'

/* eslint-disable react/prop-types */
export function DialogShowRecipe({recipe}){
    return(
        <>
    <section id="Dialog-Box-Recipe">
        <h1>{recipe.Title}</h1>
        <div id="Info-Dialog-Recipe">
            <p>Dificultad: {recipe.Difficulty}/10 | Tiempo: {recipe.estimatedTime}m</p>
            <p>Precio: {recipe.Price} | Calorias: {recipe.Calories} | Horario: {recipe.schedule}</p>
        </div>
        <div id="Ingredient-Dialog-Recipe">
            <h3>Ingredientes: </h3>
            <ul id='ul-ingredient'>
                {recipe.Ingredients.map((ingredient, index) =>(
                    <li key={index}>
                        {ingredient}
                    </li>
                ))}
            </ul>
        </div>
        <div id="Steps-Dialog-Recipe">
        <h3>Pasos: </h3>
            <ul id='ul-step'>
                {recipe.Steps.map((step, index) =>(
                    <li key={index}>
                        {step}
                    </li>
                ))}
            </ul>
        </div>
    </section>
        </>
    );
}