import * as Yup from 'yup';
import { validarCpfCnpj } from '../utils/index';

export const ProducerSchema = Yup.object().shape({
    cpf_cnpj: Yup.string().required('Campo obrigatório').test('cpfCnpj', 'CPF/CNPJ inválido', validarCpfCnpj),
    nome_produtor: Yup.string().required('Campo obrigatório'),
    fazendas: Yup.array().min(1, 'Adicione ao menos 1 fazenda').required('Campo obrigatório'),
});

export default ProducerSchema;
