// eslint-disable-next-line react/prop-types
export function RowIngredients({ onChange, onRemove, Ingredients }){
    return(
        <>
        <input
        name="Ingredients"
        type="text" 
        required
        value={Ingredients}
        onChange={e => onChange("Ingredients", e.target.value)}
        placeholder="• Ingredientes"/>
        <input  className='delete-button' onClick={onRemove} type="button" value='Eliminar'/>
        </>
    )
}