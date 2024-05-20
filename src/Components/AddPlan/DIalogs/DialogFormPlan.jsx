import { makeArray } from '../../Logic/makeArray';
import { useState, useRef } from 'react';

import { dataBase } from '../../../DataBase/Firebase';
import { collection, addDoc, doc, updateDoc } from "firebase/firestore"

import './DialogFormPlan.css'

/* eslint-disable react/prop-types */
export function DialogFormPlan({customer}){
    const currentDate = new Date().toISOString().split('T')[0];
  
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const form = useRef()
  
    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
    };

    const actualizarDocumento = async (documentId, newData) => {
        try {
            const docRef = doc(dataBase, 'Customers', documentId);
            await updateDoc(docRef, newData);
            console.log("Documento actualizado correctamente");
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        let docRef = null;
        let docRefRecord = null;
        let daysArray = makeArray(1,8,'Day',event);
        const fields = Object.fromEntries(new window.FormData(event.target));
        for(let i = 1; i<=daysArray.length;i++){
            delete fields['Day'+i]
        }
        fields.content = daysArray;
        try {
            const addPlanRef = collection(dataBase, 'Plan');
            docRef = await addDoc(addPlanRef, fields);
            alert(`Plan de ${customer.Name + ' ' + customer.LastName} añadido correctamente`);
            form.current.reset();
        } catch (error) {
            console.error("Error adding document: ", error);
        }

        const recordData = {
            customerID: customer.id,
            plan_ID: docRef.id,
            planAssignedDate: fields.startDate
        }

        try {
            const addRecordRef = collection(dataBase,'Record');
            docRefRecord = await addDoc(addRecordRef, recordData);
        } catch (error) {
            console.error("Error adding document: ", error);
        }

        const newDataCustomer = {
            plan_ID: docRef.id,
            record_ID: docRefRecord.id
        }

        actualizarDocumento(customer.id, newDataCustomer);

    }

    const arrayDays = Array(7).fill(null)

    return(
        <section id="Box-Dialog-Plan">
        {customer.plan_ID === null ? <h1>Plan Nutriconal de {customer.Name + ' ' + customer.LastName}</h1> :
        <h1>Nuevo Plan de {customer.Name + ' ' + customer.LastName}</h1>}
            <form onSubmit={handleSubmit} id='form-box' ref={form}>
                <input
                type='number'
                placeholder='Calorias' 
                required 
                name='Calories'/>
                <section id="Form-Dialog-Plan">
                {arrayDays.map((index, day=1) => (
                    <>
                    <li id='textarea-box' key={index}>
                    <label>Dia {day+=1}</label>
                    <textarea
                    name={'Day'+day}
                    autoCapitalize="sentences" 
                    autoComplete="on"
                    autoFocus
                    placeholder="Recomendacion Nutricional"
                    required
                    id="textarea-day">
                    </textarea>
                    </li>
                    </>
                ))}
                <div id='date-box'>
                <label>Inicio de plan</label>
                <input
                name='startDate'
                required
                type='date'
                id='date-plan'
                pattern="\d{4}-\d{2}-\d{2}"
                defaultValue={selectedDate} 
                onChange={handleDateChange} 
                />
                </div>
                <input 
                type='submit' 
                value='Agregar'
                id='submit-button-plan'
                />
                </section>
            </form>
        </section>
    );
}