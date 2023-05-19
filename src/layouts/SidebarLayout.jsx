import React from 'react'
import Sidebar from '../components/Dashboard/Sidebar'
import Banner from '../components/Dashboard/Banner'
import { Fade } from '@chakra-ui/react'

function SidebarLayout({ children }) {
    return (
        <React.Fragment>
            <Banner />
            <div className="container mt-5 mb-5">
                <div className="row">
                    {/* Sidebar*/}
                    <Sidebar />
                    {/* Content  */}

                    <section className="col-lg-8">
                        <Fade in>  {children}</Fade>
                    </section>

                </div>
            </div>


        </React.Fragment>
    )
}

export default SidebarLayout