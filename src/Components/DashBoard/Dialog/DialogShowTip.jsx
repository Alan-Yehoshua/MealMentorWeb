import './DialogShowTip.css'

/* eslint-disable react/prop-types */
export function DialogShowTip({tip}){
    return(
        <>
            <h1>{tip.Title}</h1>
            <textarea className='contentTip'readOnly  rows="10" cols="40">{tip.Content}</textarea>
        </>
    );
}