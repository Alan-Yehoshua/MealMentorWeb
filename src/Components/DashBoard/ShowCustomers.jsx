import { useState } from "react";
import ReactDOM from 'react-dom';

import { doc, updateDoc } from 'firebase/firestore';
import { dataBase } from '../../DataBase/Firebase';
import { useDocs } from "../Hooks/useDocs";

import { DialogShowCustomer } from "./Dialog/DialogShowCustomer";
import { DialogUpdateCustomer } from "./DialogUpdate/DialogUpdateCustomer";
import './ShowCostumers.css'

const ActiveCustomer  = async (active, ID) =>{
    try {
        const docRef = doc(dataBase, 'Customers', ID);
        await updateDoc(docRef, {Active: !active});
        alert('Actualizado correctamente');
        window.location.reload();
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

export function ShowCustomers() {
    const [loading, setLoading] = useState(false)
    const [dialogInfo, setDialogInfo] = useState({ isOpen: false, type: null, customer: null });
    

    const color = {
        red: '#a41f1f',
        green: '#669667'
    }


    const {data} = useDocs(dataBase, 'Customers', setLoading);


    const showDialog = (type, customer) => {
        setDialogInfo({ isOpen: true, type, customer });
    };

    const closeDialog = () => {
        setDialogInfo({ isOpen: false, type: null, customer: null });
    };

    const dialogContent = () => {
        const { type, customer } = dialogInfo;
        switch (type) {
            case 'ver':
                return <DialogShowCustomer customer={customer}/>
            case 'act':
                return <DialogUpdateCustomer customer={customer}/>;
            default:
                return null;
        }
    };

    const dialog = dialogInfo.isOpen && (
        <>
            <div className="overlay" onClick={closeDialog}></div>
            <dialog open className="customer-dialog">
                {dialogContent()}
                <button onClick={closeDialog} id="closeDialog">Cerrar</button>
            </dialog>
        </>
    );

    return (
        <>
            {dialogInfo.isOpen && ReactDOM.createPortal(dialog, document.body)}
            {loading ? <h1 style={{textAlign: 'center'}}>No existen clientes...</h1>:
            <ul id="ul-customer">
                {data?.map(customer => (
                    <li key={customer.id}>
                        <section className="box-right">
                            <img src="User.png" alt="Imagen de usuario" />
                            <div>
                                <p className="Fullname">{customer.Name + ' ' + customer.LastName}</p>
                                <span className="info-customer">Objetivo: {customer.Goal} | IMC: {customer.IMC}</span>
                            </div>
                        </section>
                        <section className="box-left">
                            <div className="Circle" onClick={() => showDialog('ver', customer)}><p>Ver</p></div>
                            {customer.Active ? 
                            <div className="Circle" style={{border: '2px solid'+ color.green}
                            }
                            onClick={() => ActiveCustomer(customer.Active, customer.id)}><p>Des</p></div>:
                            <div className="Circle" style={{border: '2px solid'+ color.red}
                            }
                            onClick={() => ActiveCustomer(customer.Active, customer.id)}><p>Des</p></div>}
                            <div className="Circle" onClick={() => showDialog('act', customer)}><p>Act</p></div>
                        </section>
                    </li>
                ))}
            </ul>
            }
        </>
    );
}
