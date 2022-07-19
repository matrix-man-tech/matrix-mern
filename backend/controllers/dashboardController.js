import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

// @desc   Fetch dashboard data
// @route  GET /api/dashboard
// @access Private/Admin
export const getDashboardData = asyncHandler(async (req, res) => {
  const dayOfYear = (date) =>
    Math.floor(
      (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    )

  const totalSalesAndOrderCount = Order.aggregate([
    { $match: {}},
    {
      $group: { _id: null, sum: { $sum: '$totalPrice' }, count: { $sum: 1 } },
    },
    {
      $project: { _id: 0, sum: 1, count: 1 },
    },
  ])
  const productCount = Product.estimatedDocumentCount()
  const userCount = User.estimatedDocumentCount()
  const salesOfLastWeek = await Order.aggregate([
    {
      $match: {
      
        createdAt: {
          $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
        },
      },
    },
    {
      $group: {
        _id: { $dayOfYear: '$createdAt' },
        count: { $sum: '$totalPrice' },
      },
    },
  ])
  
  const ordersOfLastWeek = await Order.aggregate([
    {
      $match: {
        
        createdAt: {
          $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
        },
      },
    },
  ])
  const ordersOfLastMonth = await Order.aggregate([
    {
      $match: {
        
        createdAt: {
          $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000),
        },
      },
    },
  ])
  const ordersOfLastYear = await Order.aggregate([
    {
      $match: {
        
        createdAt: {
          $gte: new Date(new Date() - 365 * 60 * 60 * 24 * 1000),
        },
      },
    },
  ])
  let data = await Promise.all([
    totalSalesAndOrderCount,
    productCount,
    userCount,
    salesOfLastWeek,
    ordersOfLastWeek,
    ordersOfLastMonth,
    ordersOfLastYear,
  ])
  const thisDay = dayOfYear(new Date())
  
  
  res.json({
    totalSales: Math.round(data[0][0].sum),
    orderCount: data[0][0].count,
    productCount: data[1],
    userCount: data[2],
    
    paymentMethods: data[4],
    ordersOfLastWeek: data[5],
    ordersOfLastMonth: data[6],
    ordersOfLastYear: data[7],
  })
})

