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

    const actualizarDocumento = async (documentId, newData, docu) => {
        try {
            const docRef = doc(dataBase, docu, documentId);
            await updateDoc(docRef, newData);
            console.log(`${docu} actualizado correctamente`);
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

        if(customer.record_ID === null && customer.plan_ID === null){        
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
    
            actualizarDocumento(customer.id, newDataCustomer, 'Customers');
        }else {
            const newRecordData = {
                plan_ID: customer.plan_ID
                };

            (async () => {
                    try {
                        const docRef = doc(dataBase, 'Record', customer.record_ID);
                        await updateDoc(docRef, newRecordData);
                        console.log(`Record actualizado correctamente`);
                    } catch (error) {
                        console.error("Error updating document: ", error);
                    }
            })();

            const newDataCustomer = {
                plan_ID: docRef.id,
                };

            (async () => {
                try {
                    const docRef = doc(dataBase, 'Customers', customer.id);
                    await updateDoc(docRef, newDataCustomer);
                    console.log(`Custmers actualizado correctamente`);
                } catch (error) {
                    console.error("Error updating document: ", error);
                }
        })();
        }




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
                    <li id='textarea-box' key={day}>
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