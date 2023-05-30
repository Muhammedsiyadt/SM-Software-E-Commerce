import * as Yup from 'yup';



export const resetSchema = Yup.object().shape({
    password: Yup.string().min(8).max(16).required('Password is required'),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

