// eslint-disable-next-line react/prop-types
export function RowSteps({ onChange, onRemove, Steps }){
    return(
        <>
        <input
        name="Steps"
        type="text" 
        required
        value={Steps}
        onChange={e => onChange("Steps", e.target.value)}
        placeholder="• Paso"/>
        <input className='delete-button' onClick={onRemove} type="button" value='Eliminar'/>
        </>
    )
}
