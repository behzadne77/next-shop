import * as yup from 'yup';
import { yupResolver } from 'mantine-form-yup-resolver';

export const TodoSchema = yup.object().shape({
    todo: yup.string().required().min(4),
})
  
export type TodoFormData = yup.InferType<typeof TodoSchema>;

export const resolver = yupResolver(TodoSchema);