import * as Yup from 'yup';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const profileSchema = Yup.object().shape({
    name: Yup.string().min(4).max(20).required('Name is required').trim(),
    phone: Yup.string().matches(phoneRegExp, "Invalid phone").required('Phone is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8).max(16).required('Password is required'),
    address: Yup.string().max(200).required('Address is required'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

