import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../service/api';

const ProducersContext = createContext({});

export const ProducersProvider = ({ children }) => {
    const [producers, setProducers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const listProducers = async () => {
            try {
                const response = await api.get('/producers');
                setProducers(response.data);
            } catch (error) {
                console.error('Error fetching producers:', error);
            } finally {
                setLoading(false);
            }
        };

        listProducers();
    }, []);

    const addProducer = async (newProducer) => {
        try {
            const { nome_produtor: name, cpf_cnpj: cpfCnpj, fazendas } = newProducer;

            const response = await api.post('/producers', {
                name,
                cpfCnpj
            });

            fazendas.forEach(async (fazenda) => {
                await api.post('/farms', {
                    producer: response.data.id,
                    name: fazenda.nome_fazenda,
                    city: fazenda.cidade,
                    state: fazenda.estado,
                    totalArea: fazenda.area_total,
                    agriculturalArea: fazenda.area_agricultavel,
                    vegetationArea: fazenda.area_vegetacao,
                    cultures: fazenda.culturas
                });
            });

            const newProducer = await api.get(`/producers/${response.data.id}`);
            setProducers([...producers, newProducer.data]);

        } catch (error) {
            console.error('Error adding producer:', error);
        }
    };

    const deleteProducer = async (producerId) => {
        try {
            await api.delete(`/producers/${producerId}`);
            setProducers(producers.filter(producer => producer.id !== producerId));
        } catch (error) {
            console.error('Error deleting producer:', error);
        }
    };

    const updateProducer = async (producerId, updatedProducer) => {
        try {
            const { nome_produtor: name, cpf_cnpj: cpfCnpj, fazendas } = updatedProducer;

            fazendas.forEach(async (fazenda) => {
                if (!fazenda.id) {
                    await api.post('/farms', {
                        producer: producerId,
                        name: fazenda.nome_fazenda,
                        city: fazenda.cidade,
                        state: fazenda.estado,
                        totalArea: fazenda.area_total,
                        agriculturalArea: fazenda.area_agricultavel,
                        vegetationArea: fazenda.area_vegetacao,
                        cultures: fazenda.culturas
                    });
                }
                else if (fazenda.id) {
                    await api.put(`/farms/${fazenda.id}`, {
                        name: fazenda.nome_fazenda,
                        city: fazenda.cidade,
                        state: fazenda.estado,
                        totalArea: fazenda.area_total,
                        agriculturalArea: fazenda.area_agricultavel,
                        vegetationArea: fazenda.area_vegetacao,
                        cultures: fazenda.culturas

                    });
                }
            });

            const response = await api.put(`/producers/${producerId}`, {
                name,
                cpfCnpj,
            });

            setProducers(producers.map(producer => (producer.id === producerId ? response.data : producer)));

        } catch (error) {
            console.error('Error editing producer:', error);
        }
    };

    const getProducer = async (producerId) => {
        try {
            const response = producers.filter(producer => producer.id === producerId) // await api.get(`/producers/${producerId}`);
            if (response.length === 0) return {};
            const resp = response[0];

            return {
                id: resp.id,
                cpf_cnpj: resp.cpfCnpj,
                nome_produtor: resp.name,
                fazendas: resp.farms.map(fazenda => {
                    return {
                        id: fazenda.id,
                        nome_fazenda: fazenda.name,
                        cidade: fazenda.city,
                        estado: fazenda.state,
                        area_total: fazenda.totalArea,
                        area_agricultavel: fazenda.agriculturalArea,
                        area_vegetacao: fazenda.vegetationArea,
                        culturas: fazenda.cultures.map(cultura => {
                            return {
                                id: cultura.id,
                                name: cultura.name,
                            };
                        }),
                    };
                }),
            };

        } catch (error) {
            console.error('Error fetching producer:', error);
        }
    };

    const contextValue = {
        producers,
        loading,
        addProducer,
        updateProducer,
        deleteProducer,
        getProducer,
    };

    return (
        <ProducersContext.Provider value={contextValue}>
            {children}
        </ProducersContext.Provider>
    );
};

export const useProducers = () => useContext(ProducersContext);
