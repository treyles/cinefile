import React from 'react';

const rrd = require('react-router-dom');

/* eslint-disable */
rrd.BrowserRouter = ({ children }) => <div>{children}</div>;
module.exports = rrd;
