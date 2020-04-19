import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', ()=>{
    it('should return the initial state',()=>{
        expect(reducer(undefined,{})).toEqual({
            idToken:null,
            userId:null,
            error:null,
            loading:false,
            authRedirectPath: "/"
        })
    });
    it('should store toke upon login',()=>{
        expect(reducer({
            idToken:null,
            userId:null,
            error:null,
            loading:false,
            authRedirectPath: "/"
        },{type:actionTypes.AUTH_SUCCESS,
            idToken:'x',
            userId:'y'
        })).toEqual({
            idToken:'x',
                userId:'y',
                error:null,
                loading:false,
                authRedirectPath: "/"
        })
    });
})