import './AddCostumer.css'
import { TopLogo } from '../Misc/TopLogo'
import { Navigation } from '../Misc/Navigation'

import { useState, useRef } from 'react';
import { generateSalt } from '../Logic/generateSalt.mjs';
import CryptoJS from 'crypto-js';

import { dataBase } from '../../DataBase/Firebase';
import { collection, addDoc } from "firebase/firestore"

export function AddCostumer(){  
    const defaultCustomer = {
    Active: true,
    Allergies: [''],
    Goal: "",
    IMC: 0,
    LastName: "",
    Name: "",
    Password: "",
    Preferences: [''],
    UserName: "",
    }

    const form = useRef()
    const [changeCard, setChangeCard] = useState(defaultCustomer);
    const [active, setActive] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new window.FormData(event.target));

        fields.Active = active;
        fields.Allergies = fields.Allergies.split(/,\s*|\s*y\s*/);
        fields.Preferences = fields.Preferences.split(/,\s*|\s*y\s*/);
        fields.plan_ID = null
        fields.record_ID = null
        const saltRandom = generateSalt();
        const passwordWithSalt = fields.Password + saltRandom;
        const passHash = CryptoJS.SHA256(passwordWithSalt).toString(CryptoJS.enc.Hex);
        fields.Password = passHash;
        fields.Salt = saltRandom;

        console.log(fields);

        const addCustomerRef = collection(dataBase, 'Customers');
        addDoc(addCustomerRef, fields)
        .then(() => {
            alert('Cliente añadido correctamente');
            form.current.reset();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    return(
        <>
        <TopLogo/>
        <div className='Addcustomer-Div'>
            <div className='Box'>
                <Navigation/>
                <section className='Form-Box'>
                    <form className='Formulary' onSubmit={handleSubmit} ref={form}>
                        <section>
                            <input 
                            name='Name' 
                            placeholder='Nombre' 
                            className='input-abs'
                            required
                            onChange={(e) => {setChangeCard(prevState => ({
                                ...prevState,
                                Name: e.target.value
                            }))}}
                            />
                            <input 
                            name='LastName' 
                            placeholder='Apellido' 
                            className='input-abs'
                            required
                            onChange={(e) => {setChangeCard(prevState => ({
                                ...prevState,
                                LastName: e.target.value
                            }))}}/>
                            <input 
                            name='Goal' 
                            placeholder='Objetivo'
                            multiple
                            list='options'
                            className='input-abs'
                            required
                            onChange={(e) => {setChangeCard(prevState => ({
                                ...prevState,
                                Goal: e.target.value
                            }))}}/>
                            <datalist id='options'>
                                <option value='Bajar de peso'>Bajar de peso</option>
                                <option value='Subir de peso'>Subir de peso</option>
                                <option value='Subir de Masa'>Subir de Masa</option>
                                <option value='Balanceado'>Balanceado</option>
                            </datalist>
                        </section>
                        <section>
                            <input 
                            name='UserName' 
                            placeholder='Nombre de usuario' 
                            className='input-abs'
                            required
                            onChange={(e) => {setChangeCard(prevState => ({
                                ...prevState,
                                UserName: e.target.value
                            }))}}/>
                            <input 
                            name='Password' 
                            placeholder='Contraseña' 
                            className='input-abs'
                            required
                            onChange={(e) => {setChangeCard(prevState => ({
                                ...prevState,
                                Password: e.target.value
                            }))}}/>
                            <input 
                            name='IMC' 
                            placeholder='IMC' 
                            type='number' 
                            className='input-abs'
                            required
                            onChange={(e) => {setChangeCard(prevState => ({
                                ...prevState,
                                IMC: e.target.value
                            }))}}/>
                        </section>
                        <section>
                            <input 
                            name='Allergies' 
                            placeholder='Alergias' 
                            className='input-abs-large'
                            required
                            onChange={(e) => {setChangeCard(prevState => ({
                                ...prevState,
                                Allergies: e.target.value
                            }))}}/>
                            <section className='checkbox-sec'>
                            <input 
                            name='Active' 
                            type='checkbox' 
                            checked={active} 
                            onChange={()=>{setActive(!active)}}
                            required/>
                            <label htmlFor='Active'>{active ? 'Desactivar' : 'Activar'}</label>
                        </section>
                            <input 
                            name='Preferences' 
                            placeholder='Preferencias' 
                            className='input-abs-large'
                            required
                            onChange={(e) => {setChangeCard(prevState => ({
                                ...prevState,
                                Preferences: e.target.value
                            }))}}/>
                        </section>
                            <input 
                            type='submit' 
                            value='Agregar' 
                            className='button-submit'/>
                    </form>
                    <div className='Customer-Card'>
                        <section className='Top-card'>
                            <img src='User.png' alt='Img de usuario'/>
                            <div className='Top-letter'>
                                <p>{changeCard.Name + ' ' + changeCard.LastName}</p>
                                <p>Objetivo: {changeCard.Goal} | IMC: {changeCard.IMC}</p>
                            </div>
                        </section>
                        <section className='Mid-card'>
                            <div className='Mid-letter'>
                                <p>Usuario: {changeCard.UserName}</p>
                                <p>Contraseña: {changeCard.Password}</p>
                            </div>
                        </section>
                        <section className='Down-card'>
                            <div className='Down-letter'>
                                <p>Alergias:</p>
                                <p>{changeCard.Allergies}</p>
                                <p>Preferencias:</p>
                                <p>{changeCard.Preferences}</p>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </div>
        </>
    )
}