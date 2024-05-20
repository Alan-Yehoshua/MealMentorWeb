/* eslint-disable react/prop-types */
import { updateDocID } from '../../Hooks/updateDocID'
import './DialogUpdateTip.css'

export function DialogUpdateTip({tip}){

    const handleSubmit = (event) =>{
        event.preventDefault();
        const fields = Object.fromEntries(new window.FormData(event.target));
        updateDocID(fields, 'Tip', tip.id);
    }

    return(
        <div className='Dialog-Update-Tip'>
            <form onSubmit={handleSubmit}>
                <input name='Title' defaultValue={tip.Title}/>
                <textarea name='Content' rows="10" cols="40" defaultValue={tip.Content}/>
                <input type='submit' value='Actualizar'/>
            </form>
        </div>
    );
}