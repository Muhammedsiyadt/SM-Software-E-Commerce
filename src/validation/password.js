import * as Yup from 'yup';

export const passwordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
});

