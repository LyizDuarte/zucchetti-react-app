import * as yup from 'yup';
import type { UserStatus } from '../types/User';

export const userFormSchema = yup
  .object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    status: yup.mixed<UserStatus>().oneOf(['active', 'inactive']).required('Status é obrigatório'),
  })
  .required();

export type UserFormInputs = yup.InferType<typeof userFormSchema>;

