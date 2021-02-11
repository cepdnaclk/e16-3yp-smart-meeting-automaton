const http = require('http');
const fs = require('fs');
const express = require('express');
// const cron = require('node-cron');

//configer env veriable
const dotenv = require('dotenv').config();
if (dotenv.error) {
    throw dotenv.error;
}