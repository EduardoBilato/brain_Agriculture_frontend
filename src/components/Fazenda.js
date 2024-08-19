import React, { useState } from 'react';

import { Card } from '@mui/material';
import { TextField, NumberField, Combobox, CultureField, Row, EditButton, DeleteButton } from '../components';

import { estados } from '../utils/constants';
import { useCultures } from '../contexts/CulturesContext';

export default function Fazenda({ fazenda, canEdit: controlledCanEdit, onChange }) {
    const { cultures: culturas } = useCultures();

    const [canEdit, setCanEdit] = useState(false);
    const [farmData, setFarmData] = useState(fazenda);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFarmData((prevFarmData) => ({ ...prevFarmData, [id]: value }));
        onChange(farmData);
    };

    const handleComboboxChange = (id, newValue) => {
        const newValueOrBlank = newValue ? newValue.value : '';
        setFarmData((prevValues) => ({ ...prevValues, [id]: newValueOrBlank }));
        onChange({ ...farmData, [id]: newValueOrBlank });
    };

    const handleCultureFieldChange = (newValue) => {
        const newCultureValues = newValue.map((option) => ({ id: option.id, label: option.label }));
        setFarmData((prevValues) => ({ ...prevValues, culturas: newCultureValues }));
        onChange({ ...farmData, culturas: newCultureValues });
    };

    return (
        <Card key={fazenda.id} variant="outlined" style={{ marginBottom: 10, padding: 10 }}>
            {controlledCanEdit && (
                <div style={{ padding: 8, display: 'flex', alignItems: "end" }}>
                    <EditButton onClick={() => setCanEdit(true)} />
                    <DeleteButton />
                </div>
            )}
            <Row>
                <TextField
                    disabled={!canEdit}
                    id="nome_fazenda"
                    label="Nome da Fazenda"
                    value={farmData.nome_fazenda || ''}
                    onChange={handleChange}
                />
                <TextField
                    disabled={!canEdit}
                    id="cidade"
                    label="Cidade"
                    value={farmData.cidade || ''}
                    onChange={handleChange}
                />
                <Combobox
                    disabled={!canEdit}
                    id="estado"
                    label="Estado"
                    options={estados}
                    value={farmData.estado || ''}
                    onChange={(event, newValue) => handleComboboxChange('estado', newValue)}
                />
            </Row>
            <Row>
                <NumberField
                    disabled={!canEdit}
                    id="area_total"
                    label="Área Total"
                    value={farmData.area_total || ''}
                    onChange={handleChange}
                />
                <NumberField
                    disabled={!canEdit}
                    id="area_agricultavel"
                    label="Área Agricultável"
                    value={farmData.area_agricultavel || ''}
                    onChange={handleChange}
                />
                <NumberField
                    disabled={!canEdit}
                    id="area_vegetacao"
                    label="Área Vegetal"
                    value={farmData.area_vegetacao || ''}
                    onChange={handleChange}
                />
            </Row>
            <Row>
                <CultureField
                    disabled={!canEdit}
                    id="culturas"
                    options={culturas}
                    defaultValue={farmData.culturas || []}
                    onChange={(event, newValue) => handleCultureFieldChange(newValue)}
                />
            </Row>
        </Card>
    );
}
