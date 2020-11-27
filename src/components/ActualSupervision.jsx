import React, { useState } from 'react';
// import React, { useState } from 'react';
// import { storage } from '../controller/main';
import Subtitle from './Subtitle';
import UploadImage from './UploadImage';
import firestore from '../controller/firestore';
import { useHistory } from 'react-router-dom';

const ActualSupervision = ({infoSupervision}) => {

    const history = useHistory();

    const [fileCredentials, setFileCredentials] = useState(null);
    const [fileInfo, setFileInfo] = useState(null);
    const [fileActa, setFileActa] = useState(null);
    const [fileImages, setFileImages] = useState(null);
    const [urlCredentials, setUrlCredentials] = useState("");
    const [urlInfo, setUrlInfo] = useState("");
    const [urlActa, setUrlActa] = useState("");
    const [urlImages, setUrlImages] = useState("");
    
    /* const miObj = {file: "", url:""}
    const [uploadFile, setUploadFile] = useState([]);
    setUploadFile(...uploadFile, miObj) */


    // const imagesCategories = ["Credenciales", "Información", "Acta cierre", "Fotos/videos"]
    const initialStateSupervision = {
        // unidad: '',
        // typeSupervision: '',
        // startDate: '',
        // expirationDate: '',
        // objective: '',
        // leader: '',
        // alternate: '',
        // probing: '',
        // operationalArea: '',
        // observations: '',
        // stateSupervision: 'EN PROCESO',
        relevantData: '',
    };
    const [prueba, setPrueba] = useState(initialStateSupervision);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPrueba({ ...prueba, [name]: value });
        console.log(value);
    };

    const updateDataOfSupersion = (relevantData, stateSupervision, stateAction) => {
        firestore.updateDataOfSupersion(infoSupervision.id, relevantData, stateSupervision, stateAction);
        // console.log(info);
    };

    const generateActionPlan = () => {
        updateDataOfSupersion(prueba.relevantData, 'FINALIZADA', 'PENDIENTE');
        history.push('/accion');
    }
    return (
        <>
            <Subtitle text="Sube la documentación" />

            {/* <div className="images-container">
                { 
                imagesCategories.map((categorie, index) => (
                    <UploadImage 
                        key={'button' + index}
                        categorie={categorie}
                        file={file}
                        setFile={setFile}
                        url={url}
                        setURL={setURL}
                    />))
                }    
            </div> */}

            <div className="images-container">
                    <UploadImage 
                        categorie="Credenciales"
                        file={fileCredentials}
                        setFile={setFileCredentials}
                        url={urlCredentials}
                        setURL={setUrlCredentials}
                    />
                    <UploadImage
                        categorie="Información"
                        file={fileInfo}
                        setFile={setFileInfo}
                        url={urlInfo}
                        setURL={setUrlInfo}
                    />
                    <UploadImage 
                        categorie="Acta cierre"
                        file={fileActa}
                        setFile={setFileActa}
                        url={urlActa}
                        setURL={setUrlActa}
                    />
                    <UploadImage
                        categorie="Fotos/videos"
                        file={fileImages}
                        setFile={setFileImages}
                        url={urlImages}
                        setURL={setUrlImages}
                    />  

            </div>

            <div className="info-supervision-container">
                <div className="info-supervision">
                    <div className="data-flex-column">
                        <p className="title-data-supervision">Datos relevantes:</p>
                        <textarea name="relevantData" rows="3" cols="40" onChange={handleInputChange} value={prueba.relevantData} placeholder="Anota la información importante de la supervisión">
                        </textarea>
                    </div>

                    <div className="data-flex-row">
                        <div className="row-child-containter">
                            <p className="title-data-supervision">Fecha de Inicio:</p>
                            <p>{infoSupervision.startDate}</p>
                        </div>
                        <div className="row-child-containter">
                            <p className="title-data-supervision">Fecha de Cierre:</p>
                            <p>{infoSupervision.expirationDate}</p>
                        </div>
                    </div>
                    
                    <div className="data-flex-column">
                        <p className="title-data-supervision">Objetivo:</p>
                        <p>{infoSupervision.objective}</p>
                    </div>

                    <div className="data-flex-row">
                        <div className="row-child-containter">
                            <p className="title-data-supervision">Lider:</p>
                            <p>{infoSupervision.leader}</p>
                        </div>
                        <div className="row-child-containter">
                            <p className="title-data-supervision">Alterno:</p>
                            <p>{infoSupervision.alternate}</p>
                        </div>
                    </div>

                    <div className="data-flex-row">
                        <div className="row-child-containter">
                            <p className="title-data-supervision">Toma de muestras:</p>
                            <p>{infoSupervision.probing}</p>
                        </div>
                        <div className="row-child-containter">
                            <p className="title-data-supervision">Área Operativa:</p>
                            <p>{infoSupervision.operationalArea}</p>
                        </div>
                    </div>

                    <div className="data-flex-column">
                        <p className="title-data-supervision">Observaciones iniciales:</p>
                        <p>{infoSupervision.observations}</p>
                    </div>

                    <button className="btn-primary-custom" type="submit" onClick={generateActionPlan} >
                        GENERAR PLAN DE ACCIÓN
                    </button>
                </div>
            </div>
        </>
    );
};

export default ActualSupervision;