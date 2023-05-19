import React from 'react'

function Orders() {
    return (
        <div className="table-responsive fs-md mb-4">
            <table className="table table-hover mb-0">
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Date Purchased</th>
                        <th>Status</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-3">
                            <a
                                className="nav-link-style fw-medium fs-sm"
                                href="#order-details"
                                data-bs-toggle="modal"
                            >
                                34VB5540K83
                            </a>
                        </td>
                        <td className="py-3">May 21, 2019</td>
                        <td className="py-3">
                            <span className="badge bg-info m-0">In Progress</span>
                        </td>
                        <td className="py-3">$358.75</td>
                    </tr>
                    <tr>
                        <td className="py-3">
                            <a
                                className="nav-link-style fw-medium fs-sm"
                                href="#order-details"
                                data-bs-toggle="modal"
                            >
                                78A643CD409
                            </a>
                        </td>
                        <td className="py-3">December 09, 2018</td>
                        <td className="py-3">
                            <span className="badge bg-danger m-0">Canceled</span>
                        </td>
                        <td className="py-3">
                            <span>$760.50</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-3">
                            <a
                                className="nav-link-style fw-medium fs-sm"
                                href="#order-details"
                                data-bs-toggle="modal"
                            >
                                112P45A90V2
                            </a>
                        </td>
                        <td className="py-3">October 15, 2018</td>
                        <td className="py-3">
                            <span className="badge bg-warning m-0">Delayed</span>
                        </td>
                        <td className="py-3">$1,264.00</td>
                    </tr>
                    <tr>
                        <td className="py-3">
                            <a
                                className="nav-link-style fw-medium fs-sm"
                                href="#order-details"
                                data-bs-toggle="modal"
                            >
                                28BA67U0981
                            </a>
                        </td>
                        <td className="py-3">July 19, 2018</td>
                        <td className="py-3">
                            <span className="badge bg-success m-0">Delivered</span>
                        </td>
                        <td className="py-3">$198.35</td>
                    </tr>
                    <tr>
                        <td className="py-3">
                            <a
                                className="nav-link-style fw-medium fs-sm"
                                href="#order-details"
                                data-bs-toggle="modal"
                            >
                                502TR872W2
                            </a>
                        </td>
                        <td className="py-3">April 04, 2018</td>
                        <td className="py-3">
                            <span className="badge bg-success m-0">Delivered</span>
                        </td>
                        <td className="py-3">$2,133.90</td>
                    </tr>
                    <tr>
                        <td className="py-3">
                            <a
                                className="nav-link-style fw-medium fs-sm"
                                href="#order-details"
                                data-bs-toggle="modal"
                            >
                                47H76G09F33
                            </a>
                        </td>
                        <td className="py-3">March 30, 2018</td>
                        <td className="py-3">
                            <span className="badge bg-success m-0">Delivered</span>
                        </td>
                        <td className="py-3">$86.40</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default Orders