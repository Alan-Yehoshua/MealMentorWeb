import { useState } from 'react';
import { dataBase } from '../../DataBase/Firebase';
import { useDocs } from '../Hooks/useDocs';
import ReactDOM from 'react-dom';

import { DialogShowTip } from './Dialog/DialogShowTip';
import { DialogUpdateTip } from './DialogUpdate/DialogUpdateTip';

import './ShowTips.css'

export function ShowTips(){
    const [loading, setLoading] = useState(false)
    const [activeDialog, setActiveDialog] = useState({isOpen: false, type: null, recipe: null});

    const {data} = useDocs(dataBase, 'Tip', setLoading);

    const showDialog = (type, tip) => {
        setActiveDialog({isOpen: true, type, tip})
        };
        
        const closeDialog = () => {
        setActiveDialog({isOpen: false, type: null, tip: null})
        };
    
        const dialogContent = () => {
            const {type, tip} = activeDialog;
            switch (type) {
                case 'ver':
                    return <DialogShowTip tip={tip}/>
                case 'act':
                    return <DialogUpdateTip tip={tip}/>
                default:
                    return null;
            }
        };
    
        const dialog = activeDialog.isOpen && (
            <>
                <div className="overlay" onClick={closeDialog}></div>
                <dialog open className="customer-dialog">
                    {dialogContent(activeDialog)}
                    <button onClick={closeDialog} id="closeDialog">Cerrar</button>
                </dialog>
            </>
        );

    return(
        <>
        {ReactDOM.createPortal(dialog, document.body)}
        {loading ? <h1 style={{textAlign: 'center'}}>Cargando...</h1>:
        <ol id='OlTip'>
            {data?.map((tip)=>(
                <li key={tip.id} id='LiTip'>
                    <section className='RecipeTip'>
                        <img src="recomendation.webp" alt="img de tip"/>
                        <div>
                            <p id="TitleTip">{tip.Title}</p>
                        </div>
                    </section>
                    <section id="CirclesBox">
                        <div id="CircleShowTip" onClick={() => showDialog('ver', tip)}><p>Ver</p></div>
                        <div id="CircleUpdateTip" onClick={() => showDialog('act', tip)}><p>Act</p></div>
                    </section>
                </li>
            ))}
        </ol>
        }
        </>
    );
}