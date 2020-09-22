import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Navbar, Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function AdminDashboard() {
  
    useEffect(() => {
      fetch('/api/v0/analytics/custom-reports/A').then(res => res.json()).then(data => {
      window.Bokeh.embed.embed_item(data,'LinePlot');
      });
      fetch('/api/v0/analytics/custom-reports/B').then(res => res.json()).then(data => {
      window.Bokeh.embed.embed_item(data,'BarPlot');
      });
      fetch('/api/v0/analytics/custom-reports/C').then(res => res.json()).then(data => {
      window.Bokeh.embed.embed_item(data,'DonutPlot');
      });
    }, []);


    return (

         <div className="application" style={{backgroundColor: '#F8F8FF'}}>


         <Navbar bg="dark" variant="dark">
         <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
         </Navbar>



         <Container fluid style={{ padding: '15px' }}>
         <Row className="justify-content-md-center">
                {[
                {"name":'Total Revenue',"amount":5000},
                {"name":'Total Views',"amount":5000},
                {"name":'Total Users',"amount":1400},
              ].map((data, idx) => (
                <>
                <Col sm>
                  <Card
                  bg="light"
                  text='dark'
                  style={{ width: '20rem' }}>
                   <Card.Body>
                     <Card.Title key={idx}>{data.name}<FontAwesomeIcon icon={"user-friends"} style={{color:"#000000"}}/></Card.Title>
                     <span key={data.name} style={{color:"green"}}>{data.amount}</span>
                   </Card.Body>
                  </Card>
                </Col>
                <br />
                </>
              ))}
          </Row>
         </Container>

        <br />

      <Container fluid>
        <Row className="justify-content-md-center">
        <div id='LinePlot' className="bk-root"></div>
        </Row>
      </Container>

      <Container fluid style={{ padding: '15px' }}>
      <Row>
        <Col>
        <div id='BarPlot' className="bk-root"></div>
        </Col>
        <Col>
        <div id='DonutPlot' className="bk-root"></div>
        </Col>
      </Row>
      </Container>




      </div>

     );
  }
export default AdminDashboard
