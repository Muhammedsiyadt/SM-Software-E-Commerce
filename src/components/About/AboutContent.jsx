// 08-05-2023 Athul Vinod



import React from 'react';
import { Link } from 'wouter';
import OurVisionImage from '../../assets/images/other/our-vision.png';
import OurMissionImage from '../../assets/images/other/our-mission.png';

function AboutContent() {
    return (
        <div>

            <div className="container ">
                <section className="about-interrio-area">
                    <div>
                        <div className="sec-title">
                            <h2>
                                - About <span className='text-primary'>US</span>
                            </h2>
                            <span className="decor" />
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="text-holder">
                                    <h4 className='mt-4 text-primary fw-bold'>
                                        We Have The Right Products to Fit Your Needs
                                    </h4>
                                    <p className='mt-4'>
                                        SM SOFT Computers incorporate a variety of products and services. Since our inception we have strived to be a convenient and knowledgeable source as suppliers of computers hardware for all customers ranging from IT professionals and the home enthusiast.
                                    </p>
                                    <Link to="/contact" className='btn btn-primary btn-shadow mb-4'>Contact US</Link>
                                </div>

                            </div>
                            {/*Start single item*/}
                            <div className="col-md-4">
                                <div className="single-item">
                                    <div className="img-holder">
                                    <img src={OurMissionImage} alt="Our Mission" className='rounded shadow-lg' />
                                    </div>
                                    <div className="text-box mt-4">
                                        <h3 className='text-primary'>Our Mission</h3>
                                        <p>
                                            To be known as a leader in the IT hardware reselling and to build an organization most preferred by customers
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/*End single item*/}
                            {/*Start single item*/}
                            <div className="col-md-4">
                                <div className="single-item pdtop">
                                    <div className="img-holder">
                                    <img src={OurVisionImage} alt="Our Vision" className='rounded shadow-lg' />
                                    </div>
                                    <div className="text-box mt-4">
                                        <h3 className='text-primary'>Our Vision</h3>
                                        <p>
                                            To provide end – to end hardware solutions and to be the 1 stop shop for your IT hardware solutions
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/*End single item*/}
                        </div>
                    </div>
                </section>


            </div>






        </div>
    )
}

export default AboutContent