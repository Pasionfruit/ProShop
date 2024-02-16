import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import { get } from 'mongoose';

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    console.log(order);

    // return isLoading ? (
    //     <Loader />
    // ) : error ? (
    //     <Message variant='danger'>{error}</Message>
    // ) : (
    //     <>
    //         <h1>Order {order._id}</h1>
    //         <Row>
    //             <Col md={8}>
    //                 <ListGroup variant='flush'>
    //                     <ListGroup.Item>
    //                         <h2>Shipping</h2>
    //                         <p>
    //                             <strong>Name: </strong> {order.user.name}
    //                         </p>
    //                         <p>
    //                             <strong>Email: </strong>{' '}
    //                         </p>
    //                         <p>
    //                             <strong>Address: </strong>
    //                             {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
    //                             {order.shippingAddress.postalCode},{' '}
    //                             {order.shippingAddress.country}
    //                         </p>
    //                         {order.isDelivered ? (
    //                             <Message variant='success'>
    //                                 Delivered on {order.deliveredAt}
    //                             </Message>
    //                         ) : (
    //                             <Message variant='danger'>Not Delivered</Message>
    //                         )}
    //                     </ListGroup.Item>

    //                     <ListGroup.Item>
    //                         <h2>Payment Method</h2>
    //                         <p>
    //                             <strong>Method: </strong>
    //                             {order.paymentMethod}
    //                         </p>
    //                         {order.isPaid ? (
    //                             <Message variant='success'>Paid on {order.paidAt}</Message>
    //                         ) : (
    //                             <Message variant='danger'>Not Paid</Message>
    //                         )}
    //                     </ListGroup.Item>
    //                 </ListGroup>
    //             </Col>
    //             <Col md={4}>Column</Col>
    //         </Row>
    //     </>
    // );
};

export default OrderScreen;