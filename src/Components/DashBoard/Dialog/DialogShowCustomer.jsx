import './DialogShowCustomer.css'
import {dataBase} from '../../../DataBase/Firebase'
import { useState } from 'react';
import { useDoc } from '../../Hooks/useDoc';

/* eslint-disable react/prop-types */
export function DialogShowCustomer({customer}){
    const [loading, setLoading] = useState(true);

    const {data} = useDoc(dataBase, 'Plan', customer.plan_ID, setLoading);
    console.log(data);

    return(
        <>
            <section className="Dialog-Box-Customer">
                <div id="Name-Dialog-Customer">
                    <img src="User.png"/>
                    <div>
                    <p>{customer.Name + ' ' + customer.LastName}</p>
                    <span>Objetivo: {customer.Goal} | IMC: {customer.IMC}</span>
                    </div>
                </div>
                <div id="UserName-Dialog-Customer">
                    <p>Usuario: {customer.UserName}</p>
                    <p>Contraseña: <span>{customer.Password}</span></p>
                </div>
                <div id="AllergiesanPreferences-Dialog-Customer">
                    <p>Alergias:</p>
                    <p>{customer.Allergies.join(', ')}</p>
                    <p>Preferencias:</p>
                    <p>{customer.Preferences.join(', ')}</p>
                </div> 
                {loading ? <h1 style={{textAlign:'center'}}>No existe un plan...</h1>:
                <>
                <p id='dateAssigned'>Calorias: {data.Calories} | Fecha asignada: {data.startDate}</p>
                <div id="Plan-Dialog-Customer">
                    <section >
                        {data.content?.map((day,index) => (
                            <li key={index} id='contentDay'>
                                Dia {index += 1}
                                <textarea readOnly  rows="10" cols="25" defaultValue={day}/>
                            </li>
                        ))}
                    </section>
                </div>
                </>
                }
            </section>
        </>
    );
}