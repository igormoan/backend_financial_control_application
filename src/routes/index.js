const { checkAuth } = require('../modules/user/middlewares/checkAuth');
const { makeSignup } = require('../modules/user/controllers/makeSignup');
const { makeLogin } = require('../modules/user/controllers/makeLogin');
const { checkLogin } = require('../modules/user/middlewares/checkLogin');
const { addCustomer } = require('../modules/user/controllers/addCustomer');
const { checkRegisterCustomer } = require('../modules/user/middlewares/CheckRegisterCustomer');
const { checkSignup } = require('../modules/user/middlewares/CheckSignup');
const { sendDashboardInfo } = require('../modules/user/controllers/sendDashboardInfo');
const { editProfile } = require('../modules/user/controllers/editProfile');
const { checkEditProfile } = require('../modules/user/middlewares/checkEditProfile');
const { sendUserData } = require('../modules/user/controllers/sendUserData');
const { checkEditCustomer } = require('../modules/customer/middlewares/checkEditCustomer');
const { checkAddCharge } = require('../modules/customer/middlewares/checkAddCharge');
const { sendCustomers } = require('../modules/customer/controllers/sendCustomers');
const { sendCustomer } = require('../modules/customer/controllers/sendCustomer');
const { editCustomer } = require('../modules/customer/controllers/editCustomer');
const { addCharge } = require('../modules/customer/controllers/addCharge');
const { sendAllCharges } = require('../modules/customer/controllers/sendAllCharges');
const { checkSendAllCharges } = require('../modules/customer/middlewares/checkSendAllCharges')
const { checkSendCustomer } = require('../modules/customer/middlewares/checkSendCustomer')
const { checkSendCustomers } = require('../modules/customer/middlewares/checkSendCustomers')
const { delBilling } = require('../modules/customer/controllers/delBilling');
const { checkDelBilling } = require('../modules/customer/middlewares/checkDelBilling');
const { checkEditBilling } = require("../modules/user/middlewares/checkEditBilling");
const { editBilling } = require("../modules/user/controllers/editBilling");

const express = require('express');


const routes = express();

routes.get("/", (req, res) =>
  res.status(200).json({ message: "Application online" })
);


routes.post('/signup', checkSignup, makeSignup);

routes.post('/login', checkLogin, makeLogin);

routes.get('/user', checkAuth, sendUserData);

routes.get("/dashboard", checkAuth, sendDashboardInfo);

routes.put("/user", checkAuth, checkEditProfile, editProfile);

routes.post("/customer", checkAuth, checkRegisterCustomer, addCustomer);

routes.get(
  "/customers",
  checkAuth,
  checkSendCustomers,
  sendCustomers
);

routes.get("/customer/:id", checkAuth, checkSendCustomer, sendCustomer);

routes.put("/customer", checkAuth, checkEditCustomer, editCustomer);

routes.post("/charge", checkAuth, checkAddCharge, addCharge);

routes.get("/charges", checkAuth, checkSendAllCharges, sendAllCharges);

routes.delete('/billing/:id', checkDelBilling, delBilling);

routes.put("/billing/:id", checkAuth, checkEditBilling, editBilling);

module.exports = routes;
