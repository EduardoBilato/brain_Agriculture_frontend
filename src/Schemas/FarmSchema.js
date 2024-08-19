import * as Yup from 'yup';

const FarmSchema = Yup.object().shape({
    nome_fazenda: Yup.string().required('Nome da fazenda é obrigatório'),
    cidade: Yup.string().required('Cidade é obrigatória'),
    estado: Yup.string().required('Estado é obrigatório'),
    area_total: Yup.number()
        .typeError('Área total deve ser um número')
        .required('Área total é obrigatória')
        .positive('Área total deve ser um número positivo'),
    area_agricultavel: Yup.number()
        .typeError('Área agricultável deve ser um número')    
        .required('Área agricultável é obrigatória')
        .positive('Área agricultável deve ser um número positivo'),
    area_vegetacao: Yup.number()
        .typeError('Área de vegetação deve ser um número')
        .required('Área de vegetação é obrigatória')
        .positive('Área de vegetação deve ser um número positivo')
        .test(
            'area-sum-check',
            'A soma da área agricultável e de vegetação não pode ser maior que a área total',
            function (area_vegetacao) {
                const { area_total, area_agricultavel } = this.parent;
                const areaTotalCalculada = (area_agricultavel || 0) + (area_vegetacao || 0);
                return area_total >= areaTotalCalculada;
            }
    ),    
    culturas: Yup.array().min(1, 'Selecione ao menos uma cultura').required('Campo obrigatório'),
});

export default FarmSchema;