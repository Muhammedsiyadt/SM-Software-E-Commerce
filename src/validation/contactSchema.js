import * as Yup from 'yup';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const contactSchema = Yup.object().shape({
    name: Yup.string().min(4).max(20).required('Name is required').trim(),
    phone: Yup.string().matches(phoneRegExp, "Invalid phone").required('Phone is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string().max(200).required("Message is required"),
    subject: Yup.string().min(4).max(40).required("Subject is required"),
});

