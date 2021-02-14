
process.env.NODE_ENV = 'test'

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../Route/admin');
const server = require('../Server');

describe('Administrator Login', () => {
    it('Can login successfully', (done) => {
        request(server).post('/login/admin')
            .send({username: "cham96", password: "12345678", email: "abc@gmail.com"})
            .then(res => {
                const body = res.body;
                expect(res.status).to.be.equal(201);
                expect(body).to.contain.property('username');
                expect(body).to.contain.property('email');
                expect(body.username).to.be.equal('cham96');
                expect(body.email).to.be.equal('abc@gmail.com');
                done();
            })
            .catch((err) => done(err));
    }).timeout(30000);

    it('Login fails', (done) => {
        request(server).post('/login/admin')
        .send({username: "cham96", password: "8756412", email: "abc@gmail.com"})
            .then(res => {
                const body = res.body;
                expect(res.status).to.be.equal(401);
                expect(body.message).to.be.equal('Email or password wrong...');
                done();
            })
            .catch((err) => done(err));
    }).timeout(30000);
});