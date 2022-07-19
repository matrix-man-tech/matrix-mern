import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {
  Card,
  Col,
  Modal,
  Button,
  Container,
  Row,
  Image,
  DropdownButton,
  Dropdown,
  Form,
} from 'react-bootstrap'
import Loader from '../components/Loader'
import { populateDashboard } from '../actions/dashboardActions'



import SalesReport from '../components/SalesReport'

const AdminDashboard = () => {
  const dispatch = useDispatch()

  
  const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
  })
  const [showDownloadComponent, setShowDownloadComponent] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  

  const dashboardPopulate = useSelector((state) => state.dashboardPopulate)
  const {
    loading: dashboardLoading,
    data,
    error: dashboardError,
  } = dashboardPopulate

  useEffect(() => {
    if (data) {
      console.log(data)
    } else {
      dispatch(populateDashboard())
    }
  }, [dispatch])

  // const showDownloadButton = (type, dates) => {
  //   const orders =
  //     type === 'weekly'
  //       ? data?.ordersOfLastWeek
  //       : type === 'monthly'
  //       ? data?.ordersOfLastMonth
  //       : data?.ordersOfLastYear
  //   return (
  //     <PDFDownloadLink
  //       document={<SalesReport orders={orders} />}
  //       fileName={`${type} Sales Report.pdf`}
  //     >
  //       {type}
  //     </PDFDownloadLink>
  //   )
  // }
 

  

  return (
    <>
      <Container>
        <Row>
          <Card style={{ width: '19rem', margin: '.5rem' }}>
            <Card.Body>
              <Row>
                <Col
                  md={3}
                  className='d-block align-items-center justify-content-center'
                >
                  <Image src='/dollar-sign.jpg' roundedCircle fluid />
                </Col>
                <Col md={9}>
                  <Card.Title>Total Sales</Card.Title>
                  <Card.Text>Rs. {data?.totalSales}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ width: '19rem', margin: '.5rem' }}>
            <Card.Body>
              <Row>
                <Col
                  md={3}
                  className='d-block align-items-center justify-content-center'
                >
                  <Image src='/delivery-van.png' roundedCircle fluid />
                </Col>
                <Col md={9}>
                  <Card.Title>Total Orders</Card.Title>
                  <Card.Text> {data?.orderCount}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ width: '19rem', margin: '.5rem' }}>
            <Card.Body>
              <Row>
                <Col
                  md={3}
                  className='d-block align-items-center justify-content-center'
                >
                  <Image src='/product.png' fluid />
                </Col>
                <Col md={9}>
                  <Card.Title>Total Products</Card.Title>
                  <Card.Text> {data?.productCount}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ width: '19rem', margin: '.5rem' }}>
            <Card.Body>
              <Row>
                {data ? (
                  <>
                    <Col
                      md={3}
                      className='d-block align-items-center justify-content-center'
                    >
                      <Image src='/usericon.png' fluid />
                    </Col>
                    <Col md={9}>
                      <Card.Title>Total Users</Card.Title>
                      <Card.Text> {data?.userCount}</Card.Text>
                    </Col>
                  </>
                ) : (
                  <Loader />
                )}
              </Row>
            </Card.Body>
          </Card>
        </Row>
        {/* <Row>
          <Col md={9}></Col>
          <Col md={2} className='mt-3'>
            <DropdownButton
              id='dropdown-basic-button'
              title='Download Sales Report'
            >
              <Dropdown.Item as='button'>
                {showDownloadButton('weekly')}
              </Dropdown.Item>
              <Dropdown.Item as='button'>
                {showDownloadButton('monthly')}
              </Dropdown.Item>
              <Dropdown.Item as='button'>
                {showDownloadButton('yearly')}
              </Dropdown.Item>
             
            </DropdownButton>
          </Col>
        </Row> */}

      
      </Container>
    </>
  )
}

export default AdminDashboard
