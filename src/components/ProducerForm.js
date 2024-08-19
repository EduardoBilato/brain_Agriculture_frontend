import React, { useState } from 'react';
import { TextField, Fazenda, ActionsBar, Row, Col, NewFarmButton, SaveButton, CloseButton } from '../components';

import ProdutorSchema from '../Schemas/ProducerSchema';
import FazendaSchema from '../Schemas/FarmSchema';

export default function ProducerForm({ initialProducerData, onSubmit }) {
    const [producerData, setProducerData] = useState(initialProducerData);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { id, value } = event.target;
        setProducerData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleFarmChange = (index, updatedFarm) => {
        setProducerData((prevData) => {
            const updatedFarms = [...prevData.fazendas];
            updatedFarms[index] = updatedFarm;
            return { ...prevData, fazendas: updatedFarms };
        });
    };

    const handleNewFarm = () => {
        setProducerData((prevData) => ({
            ...prevData,
            fazendas: [...prevData.fazendas, {
                nome_fazenda: '',
                cidade: '',
                estado: '',
                area_total: '',
                area_agricultavel: '',
                area_vegetacao: '',
                culturas: []
            }],
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await Promise.all(producerData.fazendas.map((farm) => FazendaSchema.validate(farm)));

            await ProdutorSchema.validate(producerData, { abortEarly: false });

            onSubmit(producerData);

        } catch (validationError) {
            if (validationError.inner) {
                const validationErrors = {};
                validationError.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            } else {
                console.error('Erro ao validar produtor:', validationError);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Col>
                <TextField
                    id="cpf_cnpj"
                    label="CPF/CNPJ"
                    value={producerData.cpf_cnpj || ''}
                    onChange={handleChange}
                    error={Boolean(errors.cpf_cnpj)}
                    helperText={errors.cpf_cnpj}
                />
                <TextField
                    id="nome_produtor"
                    label="Nome do Produtor"
                    value={producerData.nome_produtor || ''}
                    onChange={handleChange}
                    error={Boolean(errors.nome_produtor)}
                    helperText={errors.nome_produtor}
                />
            </Col>

            <Row>
                <NewFarmButton onClick={handleNewFarm} />
            </Row>

            {producerData.fazendas.map((fazenda, index) => (
                <Fazenda
                    key={index}
                    canEdit={true}
                    fazenda={fazenda}
                    onChange={(updatedFarm) => handleFarmChange(index, updatedFarm)}
                />
            ))}

            <ActionsBar>
                <SaveButton type="submit" />
                <CloseButton href={'/'} />
            </ActionsBar>
        </form>
    );
};