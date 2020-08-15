import { observer } from 'mobx-react';
import { observable } from 'mobx';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Line, Bar } from 'react-chartjs-2';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup"
import ToggleButton from "react-bootstrap/ToggleButton"
import Card from "react-bootstrap/Card";
//import loaderImg from "../assets/img/loader2.gif";




const Analytics = observer(class Analytics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://127.0.0.1:5000/',
            dataset: [],
            case_confirmed: [],
            dates: [],
            state_name: [],
            loading: true,
            imgloading: true,
            deathcount:[]

        }
    }
    getalldata(pgload) {
        fetch(this.state.url)
            .then(res => res.json())
            .then(
                (result) => {
                    if (Object.keys(result).length > 0 && result.constructor === Object) {
                        if (Object.keys(result['main_data']).length > 0 && result['main_data'].constructor === Object) {
                            this.setState({
                                dataset: result['main_data'],
                                case_confirmed: result['main_data']['case_confirmed'],
                                deathcount: result['main_data']['deaths'],
                                dates: result['main_data']['dates'],
                                loading: false,
                                imgloading: false,
                                state_name: result['State_Name']

                            });
                            this.setState({

                                loading: false,
                                imgloading: false,
                            });
                            //console.log(ds)
                        }
                        else {
                            this.setState({
                                dataset: [],
                                case_confirmed: [],
                                loading: false,
                                imgloading: false,
                            });
                        }

                    }
                    else {
                        this.setState({
                            dataset: [],
                            case_confirmed: [],
                            loading: false,
                            imgloading: false,
                        });
                    }
                },
                (error) => {
                    this.setState({
                        dataset: [],
                        case_confirmed: [],
                        loading: false,
                        imgloading: false,
                    });
                }
            )
    }
    componentDidMount() {

        this.getalldata(true)


    }
    render() {
        var label_list = this.state.dates
        var case_confirmed = this.state.case_confirmed
        var main_data = this.state.dataset
        var darray = this.state.state_name
        var death_counts = this.state.deathcount
        var datamain = {
            labels:
                label_list, datasets: [
                    {
                        label: 'Confirmed Cases of Last 15 Days',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        type:'bar',
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: case_confirmed,
                        //onAnimationComplete: {
                        onAnimationComplete: function () {
              
                              var ctx = this.chart.ctx;
                              ctx.textAlign = "center";
                              ctx.textBaseline = "bottom";
              
                              this.chart.config.data.datasets.forEach(function (dataset) {
                                ctx.fillStyle = dataset.strokeColor;
                                dataset.metaDataset._points.forEach(function (p) {
                                    ctx.fillText(p.value, p.x, p.y - 10);
                                });
                              })
                            }
                          //}
                    }
                ]
        };
        var datadeaths = {
            labels:
                label_list, datasets: [
                    {
                        label: 'Number of Deaths in Last 15 Days',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: ' rgba(229, 2, 148, 1)',
                        borderColor: ' rgba(229, 2, 148, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        type:'bar',
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: ' rgba(229, 2, 148, 1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: ' rgba(229, 2, 148, 1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: death_counts,
                        //onAnimationComplete: {
                        onAnimationComplete: function () {
              
                              var ctx = this.chart.ctx;
                              ctx.textAlign = "center";
                              ctx.textBaseline = "bottom";
              
                              this.chart.config.data.datasets.forEach(function (dataset) {
                                ctx.fillStyle = dataset.strokeColor;
                                dataset.metaDataset._points.forEach(function (p) {
                                    ctx.fillText(p.value, p.x, p.y - 10);
                                });
                              })
                            }
                          //}
                    }
                ]
        };





        return (

            <Container width="810px" id="Chart">
                <link rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous" />
                <Row>
                    <Col xs={1}  >

                    </Col>
                    <Col xs={10}>
                        <div className="mx-auto"><h2>National Wise Data</h2></div>
                    </Col>
                    <Col xs={1} >

                    </Col>
                </Row>
                <Row>
                    <Col xs={1}  >

                    </Col>
                    <Col xs={10}>
                        {main_data
                            ? <Container>
                                <Row className="mt-5">

                                </Row>
                                <Row className="mt-5">
                                    <Col xs={10}>
                                        <Line data={datamain} />
                                    </Col>

                                </Row>
                            </Container>
                            /*:<img src={loaderImg}></img> */
                            : <span>No Data Availablet</span>
                        }

                    </Col>
                    <Col xs={1} >

                    </Col>
                </Row>
                <Row>
                    <Col xs={1}  >

                    </Col>
                    <Col xs={10}>
                        {main_data
                            ? <Container>
                                <Row className="mt-5">

                                </Row>
                                <Row className="mt-5">
                                    <Col xs={10}>
                                        <Line data={datadeaths} />
                                    </Col>

                                </Row>
                            </Container>
                            /*:<img src={loaderImg}></img> */
                            : <span>No Data Availablet</span>
                        }

                    </Col>
                    <Col xs={1} >

                    </Col>
                </Row>
            </Container>
        );
    }
});


export default Analytics