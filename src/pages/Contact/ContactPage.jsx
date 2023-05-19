// 08-05-2023 Athul Vinod




import React from 'react'
import DefaultLayout from '../../layouts/DefaultRoute';
import Banner from '../../components/Contact/Banner';
import ContactForm from '../../components/Contact/ContactForm';
import { Helmet } from 'react-helmet';

function ContactPage() {
  return (
    <DefaultLayout>
      <Helmet>
        <title> {process.env.REACT_APP_PRODUCT_NAME} - Contact </title>
      </Helmet>
      <Banner />
      <ContactForm />
    </DefaultLayout>
  )
}

export default ContactPage