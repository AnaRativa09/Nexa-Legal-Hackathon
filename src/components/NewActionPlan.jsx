import React, { useState } from 'react';
import firestore from '../controller/firestore';
import { Button, Form } from "react-bootstrap";


const NewActionPlan = () => {

    const initialStateActionPlan = {
        idSupervision:'',
        taskDetail: '',
        responsibleArea: '',
        responsibleLeader: '',
        anotherResponsible: '',
        startDate: '',
        expirationDate: '',
        stateSupervision: 'EN PROCESO',
    };

    const [newActionPlan, setActionPlan] = useState(initialStateActionPlan );
    const [sendConfirmation, setSendConfirmation] = useState(false);

    const addDocActionPlan = (arrayActionPlan) => {
        firestore.addActionPlan(arrayActionPlan);
        console.log(arrayActionPlan);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setActionPlan({ ...newActionPlan, [name]: value });
    };

     // ADD NEW ACTION PLAN
    const handleRegisterActionPlan = (e) => {
        e.preventDefault();
        // console.log(order);
        addDocActionPlan(newActionPlan);
        setSendConfirmation(true);
        setTimeout(() => {
            setSendConfirmation(false)
        }, 3000);
        setActionPlan({ ...initialStateActionPlan });
    };


    return (
        <div>
            <Form className="form-container">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Detallar Tarea</Form.Label>
                    <Form.Control as="textarea" rows={3} name="taskDetail" onChange={handleInputChange} value={newActionPlan.taskDetail}/>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control as="select" name="responsibleArea" onChange={handleInputChange} value={newActionPlan.responsibleArea} required >
                        <option value="responsibleArea">Área Responsable</option>
                        <option value="regular">Almacén</option>
                        <option value="especial">Campamentos</option>
                        <option value="especial">Mina</option>
                        <option value="especial">Planta Concentradora</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control as="select" name="responsibleLeader" onChange={handleInputChange} value={newActionPlan.responsibleLeader} required >
                        <option value="responsibleLeader">Líder Responsable</option>
                        <option value="daniel">Daniel Fernandez Suárez</option>
                        <option value="pedro">Pedro Pérez</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicAnotherResponsible">
                    <Form.Control type="text" placeholder="Otros Responsable" name="anotherResponsible" onChange={handleInputChange} value={newActionPlan.anotherResponsible} required />
                </Form.Group>

                <Form.Group controlId="formBasicDate">
                    <Form.Label>Fecha de Inicio de Plan de Acción</Form.Label>
                    <Form.Control type="date" placeholder="Fecha de inicio" name="startDate" onChange={handleInputChange} value={newActionPlan.startDate} required />
                </Form.Group>

                <Form.Group controlId="formBasicDate">
                    <Form.Label>Cierre estimado de Plan de Acción</Form.Label>
                    <Form.Control type="date" placeholder="Fecha de cierre" name="expirationDate" onChange={handleInputChange} value={newActionPlan.expirationDate} required />
                </Form.Group> 

                <Button className="btn-primary-custom" type="submit"  onClick={handleRegisterActionPlan}>
                    CREAR PLAN DE ACCIÓN
                </Button>
            </Form>
            {
                    sendConfirmation ?
                        <div className="confirmation">
                            Guardado en Colección
                    </div>
                        : null
                }
        </div>
    )
}

export default NewActionPlan;