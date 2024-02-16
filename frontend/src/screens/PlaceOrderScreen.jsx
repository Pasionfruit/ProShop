import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from '../components/Message';
import Loader from '../components/Loader';
import {useCreateOrderMutation} from '../slices/ordersApiSlice'
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if(!cart.shippingAddress.address){
            navigate('/shipping');
        } else if(!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);


    //This is the problem Right here
    //Error: Not authorized, no token
    const placeOrderHandler = async () => {
        try {
            // Call the createOrder function
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            });
    
            // Log the response to the console to inspect its content
            console.log('Response from createOrder:', res);
    
            // Check if the response contains _id and navigate accordingly
            if (res && res._id) {
                dispatch(clearCartItems());
                navigate(`/order/${res._id}`);
            } else {
                // Handle case where _id is not found in the response
                toast.error('Failed to retrieve order ID');
            }
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error placing order:', error);
            toast.error('Failed to place order');
        }
    };
    
  return(

    <>
    <CheckoutSteps step1 step2 step3 step4 />
    <Row>
        <Col md={8}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address: </strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city} {' '} {cart.shippingAddress.postalCode}
                        , {' '}{cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cart.cartItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                    ) : (
                        <ListGroup variant="flush">
                            { cart.cartItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                          <Link to={`/product/${item._id}`}>
                                            {item.name}
                                          </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items: </Col>
                            <Col>
                                ${cart.itemsPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping: </Col>
                            <Col>
                                ${cart.shippingPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax: </Col>
                            <Col>
                                ${cart.taxPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total: </Col>
                            <Col>
                                ${cart.totalPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {error && (<Message variant="danger">{error.data.message}</Message>)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type="button" className="btn-block" disabled={cart.cartItems === 0}
                        onClick={ placeOrderHandler}>
                            Place Order
                        </Button>
                        {isLoading && <Loader />}
                    </ListGroup.Item>
                </ListGroup>
                
            </Card>
        </Col>
    </Row>
  </>
  );
}

export default PlaceOrderScreen