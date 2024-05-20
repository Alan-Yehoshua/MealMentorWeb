import { useState } from 'react';
import { DialogFormPlan } from './DIalogs/DialogFormPlan';
import { DialogUpdatePlan } from './DIalogs/DialogUpdatePlan';
import { dataBase } from '../../DataBase/Firebase';
import { useDocs } from '../Hooks/useDocs';

import ReactDOM from 'react-dom';
import './ShowCustomersAP.css'

export function ShowCustomersAP(){
    const [loading, setLoading] = useState(false)
    const [activeDialog, setActiveDialog] = useState({isOpen: false, type: null, customer: null});

    const {data} = useDocs(dataBase, 'Customers', setLoading);

    const showDialog = (type, customer) => {
        setActiveDialog({isOpen: true, type, customer})
    };
    const closeDialog = () => {
        setActiveDialog({ isOpen: false, type: null, customer: null });
    };

    const dialogContent = () => {
        const {type, customer} = activeDialog;
        switch (type) {
            case 'add':
                return <DialogFormPlan customer={customer}/>;
            case 'act':
                return <DialogUpdatePlan customer={customer}/>;
            default:
                return null;
        }
    };

    const dialog = activeDialog.isOpen && (
        <>
            <div className="overlay" onClick={closeDialog}></div>
            <dialog open className="customer-dialog">
                {dialogContent(activeDialog,)}
                <button onClick={closeDialog} id="closeDialog">Cerrar</button>
            </dialog>
        </>
    );

    return(
        <>
        {activeDialog.isOpen && ReactDOM.createPortal(dialog, document.body)}
        {loading ? <p style={{textAlign: 'center'}}>Cargando...</p>:
         <ul className='ul-plan'>
        {data?.map((customer) => (
        <div className='Plan-Customer-Card' key={customer.id}>
            <section className='Plan-Card-Top'>
                <img src='User.png'/>
                <div>
                    <p>{customer.Name}</p>
                    <span>Objetivo: {customer.Goal} | IMC: {customer.IMC}</span>
                </div>
            </section>
            <section className='Plan-Card-Bot'>
                <div className='circle-add' onClick={() => showDialog('add', customer)}>Add</div>
                <div className='circle-upd' onClick={() => showDialog('act', customer)}>Act</div>
            </section>
        </div>
        ))}
        </ul>
        }
        </>
    );
}