import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './ShoppingList.css';
import Form from 'react-bootstrap/Form';
import {ReactComponent as FaSausage} from './assets/sIc.svg';
import {ReactComponent as FaSteak} from './assets/stIc.svg';
import {ReactComponent as FaBaguette} from './assets/bIc.svg';
import {ReactComponent as FaEuro} from './assets/eIc.svg';



class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [],
            dropDownIndex: 0,

            orders: [],
            
            sumSausages: 0,
            sumMeat: 0,
            sumBaguettes: 0,

            priceSausage: 0,
            priceMeat: 0,
            priceBaguettes: 0,
            priceAllg: 0
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.createData = this.createData.bind(this);
    }

    componentDidMount() {
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open('GET', 'https://barbecueapp.000webhostapp.com/getDates.php');
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
                console.log('response: ');
                const datesResponse = JSON.parse(xmlhttp.response);
                console.log(datesResponse);
                this.setState({
                    dates: datesResponse
                }, () => {
                    this.loadPricesAndOrders();
                });
            }
        }
        xmlhttp.send();
    }

    loadPricesAndOrders() {
        let pS = this.state.dates.length > 0 ? parseFloat(this.state.dates[this.state.dropDownIndex].priceSausage) : 0.0;
        let pM = this.state.dates.length > 0 ? parseFloat(this.state.dates[this.state.dropDownIndex].priceMeat) : 0.0;
        let pB = this.state.dates.length > 0 ? parseFloat(this.state.dates[this.state.dropDownIndex].priceBaguettes) : 0.0;
        let pA = this.state.dates.length > 0 ? parseFloat(this.state.dates[this.state.dropDownIndex].priceAllg) : 0;
        this.setState({
            priceSausage: pS,
            priceMeat: pM,
            priceBaguettes: pB,
            priceAllg: pA
        }, () => {
            //load orders
            if (this.state.dates.length > 0) {
                var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
                xmlhttp.open('POST', 'https://barbecueapp.000webhostapp.com/showOrders.php');
                xmlhttp.onreadystatechange = () => {
                    if (xmlhttp.readyState === 4) {
                        var orders = [];
                        const ordersResponse = JSON.parse(xmlhttp.response);
                        for (var i = 0; i < ordersResponse.length; i++) {
                            let order = ordersResponse[i];
                            orders.push(this.createData(order.name, parseFloat(order.cntSausages), parseFloat(order.cntMeat), parseFloat(order.cntBaguettes), parseFloat(0)));
                        }
                        console.log('orders');
                        console.log(orders)
                        this.setState({
                            orders: orders
                        }, () => {
                            var sumS = 0;
                            var sumM = 0;
                            var sumB = 0;
                            var sumP = 0;
                            for (let i = 0; i < this.state.orders.length; i++) {
                                let order = this.state.orders[i];
                                sumS = sumS + order.cntSausages;
                                sumM = sumM + order.cntMeat;
                                sumB = sumB + order.cntBaguettes;
                                sumP = sumP + order.price;
                            }
                            this.setState({
                                sumSausages: sumS,
                                sumMeat: sumM,
                                sumBaguettes: sumB,
                            }, () => {
                
                                var newOrders = [...this.state.orders];
                                for (let j = 0; j < this.state.orders.length; j++) {
                                    let order = {...this.state.orders[j]};
                                    let partPriceS = this.state.sumSausages > 0 ? (order.cntSausages / this.state.sumSausages) * this.state.priceSausage : 0;
                                    let partPriceM = this.state.sumMeat > 0 ? (order.cntMeat / this.state.sumMeat) * this.state.priceMeat : 0;
                                    let partPriceB = this.state.sumBaguettes > 0 ? (order.cntBaguettes / this.state.sumBaguettes) * this.state.priceBaguettes : 0;
                                    let partPriceA = parseInt(this.state.orders.length) > 0 ? (1 / parseInt(this.state.orders.length)) * this.state.priceAllg : 0;
                                    order.price = this.roundDecimal(partPriceS + partPriceM + partPriceB + partPriceA);
                                    newOrders[j] = order;
                                }
                                this.setState({orders: newOrders}, () => {
                                    console.log("orders.length");
                                    console.log(this.state.orders.length);
                                });
                            });
                        });
                    }
                }
                const reqData = {
                    currDateID: this.state.dates[this.state.dropDownIndex].ID
                }
                xmlhttp.send(JSON.stringify(reqData));
            }
        });        
    }

    createData(name, cntSausages, cntMeat, cntBaguettes, price) {
        return { name, cntSausages, cntMeat, cntBaguettes, price };
    }

    roundDecimal(num){
        let dec = Math.round((num + Number.EPSILON) * 100) / 100;
        if (isNaN(dec)) {
            return 0;
        }
        return dec;
    }

    handleSelect(event) {
        this.setState({
            dropDownIndex: event.target.value
        }, () => {
            this.loadPricesAndOrders();
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.dates.length > 0
                        ?
                        <div>
                            <Form.Group controlId="formBasicSelect" style={{width: "50%", marginLeft: "auto", marginRight: "auto"}}>
                                <Form.Label style={{color: "white"}}>Tag auswählen:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={this.state.dropDownIndex}
                                    onChange={this.handleSelect}
                                    style={{backgroundColor: "black", color: "white"}}
                                >
                                {
                                    this.state.dates.map(function(day, i) {
                                        let formDay = day.date.split('-');
                                        let fDay = formDay[2] + '.' + formDay[1] + '.' + formDay[0];
                                        return <option key={day.ID} value={i}>{fDay}</option>;
                                    })
                                }
                                </Form.Control>
                            </Form.Group>
                            <TableContainer component={Paper} style={{backgroundColor: "black", color: "white"}}>
                                <Table sx={{ minWidth: 0 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: 100 }}>Name</TableCell>
                                        <TableCell style={{ width: 100, padding: "6px" }} align="center"><div style={{overflow: "hidden", maxWidth: "50px", marginLeft: "auto", marginRight: "auto"}}><FaSausage /></div></TableCell>
                                        <TableCell style={{ width: 100, padding: "6px" }} align="center"><div style={{overflow: "hidden", maxWidth: "50px", marginLeft: "auto", marginRight: "auto"}}><FaSteak /></div></TableCell>
                                        <TableCell style={{ width: 100, padding: "6px" }} align="center"><div style={{overflow: "hidden", maxWidth: "50px", marginLeft: "auto", marginRight: "auto"}}><FaBaguette /></div></TableCell>
                                        <TableCell style={{ width: 100, padding: "6px", borderLeft: "1px solid white"}} align="center"><div style={{overflow: "hidden", maxWidth: "50px", marginLeft: "auto", marginRight: "auto"}}><FaEuro /></div></TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {this.state.orders.map((row) => (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell style={{ width: 100 }} component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell style={{ width: 100 }} align="center">{row.cntSausages}</TableCell>
                                        <TableCell style={{ width: 100 }} align="center">{row.cntMeat}</TableCell>
                                        <TableCell style={{ width: 100 }} align="center">{row.cntBaguettes}</TableCell>
                                        <TableCell style={{ width: 100, borderLeft: "1px solid white" }} align="center" >{row.price}€</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell style={{ width: 100 }}></TableCell>
                                        <TableCell style={{ width: 100 }}></TableCell>
                                        <TableCell style={{ width: 100 }}></TableCell>
                                        <TableCell style={{ width: 100 }}></TableCell>
                                        <TableCell style={{ width: 100, borderLeft: "1px solid white" }}></TableCell>
                                    </TableRow>
                                    <TableRow align="right">
                                        <TableCell style={{ width: 100 }}>SUMME:</TableCell>
                                        <TableCell style={{ width: 100 }} align="center">{this.state.sumSausages}</TableCell>
                                        <TableCell style={{ width: 100 }} align="center">{this.state.sumMeat}</TableCell>
                                        <TableCell style={{ width: 100 }} align="center">{this.state.sumBaguettes}</TableCell>
                                        <TableCell style={{ width: 100, borderLeft: "1px solid white" }} align="center">{this.roundDecimal(this.state.priceSausage + this.state.priceMeat + this.state.priceBaguettes + this.state.priceAllg)}€</TableCell>
                                    </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        :
                        <div style={{color: "red"}}>
                            <h3>Es stehen keine Tage zur Auswahl.</h3>
                        </div>
                }
                { /*<a href='/admin' style={{float: 'right'}}>Preise und Tage bearbeiten</a>*/ }
            </div>
        );
    }
}

export default ShoppingList;
