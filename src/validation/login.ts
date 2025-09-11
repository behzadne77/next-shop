import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';

export const loginSchema = yup.object().shape({
    username: yup.string().required().min(4),
    password: yup.string().min(6).required()
})
  
export type LoginFormData = yup.InferType<typeof loginSchema>;

export const resolver = yupResolver(loginSchema);