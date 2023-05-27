import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const addressSchema = Yup.object().shape({
    name: Yup.string().min(4).max(20).required('Name is required').trim(),
    pincode: Yup.string().min(6).max(6).required('PinCode is required'),
    phone: Yup.string().matches(phoneRegExp, "Invalid phone").required('Phone is required'),
    locality: Yup.string().min(1).max(100).required('Locality is required').trim(),
    address: Yup.string().min(4).max(200).required('Address is required').trim(),
    city: Yup.string().min(1).max(200).required('City/District/Town is required').trim(),
    state: Yup.string().min(1).max(200).required('State is required').trim(),
    landmark: Yup.string().nullable(),
    alternative_phone: Yup.string().matches(phoneRegExp, "Invalid phone").nullable(),
    address_type: Yup.string().oneOf(['1', '2']).required('Address type is required'),
});
