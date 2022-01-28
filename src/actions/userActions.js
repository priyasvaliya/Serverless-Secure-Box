import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_REQUEST,
    USER_DETAILS_RESET,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    
    USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_REQUEST,

    ORDER_LIST_MY_RESET
 } from '../constants/constatnts'
 import axios from 'axios'
 import UserPool from "../UserPool";

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({type:USER_LOGIN_REQUEST});

        const config = {
            'Content-type':"application/json"
        }
        const {data} = await axios.post('/api/users/login', 
                        {username:email, password:password},
                        config 
                    )
        console.log(data)

        dispatch({type:USER_LOGIN_SUCCESS, payload:data})

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        console.log(error.response)
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }

}

export const logOut = () => async (dispatch) => {
    try {
        localStorage.removeItem('userInfo')

        dispatch({type:USER_LOGOUT})
        localStorage.removeItem("userInfo");
        localStorage.removeItem("securityCheck");
        // dispatch({type:USER_DETAILS_RESET})
        
        // dispatch({type:ORDER_LIST_MY_RESET})
        // dispatch({type:USER_LIST_RESET})
    } catch (error) {
        
    }
}

export const register = (name, email, password) => async (dispatch) => {

    try {
        dispatch({type:USER_REGISTER_REQUEST});

        const config = {
            'Content-type':"application/json"
        }

        const {data} = await axios.post('/api/users/register', 
                        {email:email, password:password, name:name},
                        config 
                    )
        console.log(data)

        dispatch({type:USER_REGISTER_SUCCESS, payload:data})

        dispatch({type:USER_LOGIN_SUCCESS, payload:data})

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        console.log(error.response)
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }

}

export const getUserDetails = (id) => async (dispatch, getState) => {

    try {
        dispatch({type:USER_DETAILS_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState()

        console.log(userInfo)
        const config = {
            headers:{
            'Content-type':"application/json",
            Authorization : `Bearer ${userInfo.token}`,
            }
        }
    
        const {data} = await axios.get(`/api/users/${id}/`,config)

        console.log(data)

        dispatch({type:USER_DETAILS_SUCCESS, payload:data})


        
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }

}


export const updateUserProfile = (user) => async (dispatch, getState) => {

    try {
        dispatch({type:USER_UPDATE_PROFILE_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState()

        console.log(userInfo)
        const config = {
            headers:{
            'Content-type':"application/json",
            Authorization : `Bearer ${userInfo.token}`,
            }
        }
    
        const {data} = await axios.put(`/api/users/profile/update`,user,config)

        console.log(data)

        dispatch({type:USER_UPDATE_PROFILE_SUCCESS, payload:data})

        dispatch({type:USER_LOGIN_SUCCESS, payload:data})

        localStorage.setItem('userInfo', JSON.stringify(data));

        
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }

}

export const listUsers = () => async (dispatch, getState) => {

    try {
        dispatch({type:USER_LIST_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState()

        console.log(userInfo)
        const config = {
            headers:{
            'Content-type':"application/json",
            Authorization : `Bearer ${userInfo.token}`,
            }
        }
    
        const {data} = await axios.get(`/api/users/`,config)

        console.log(data)

        dispatch({type:USER_LIST_SUCCESS, payload:data})
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }

}


export const deleteUser = (id) => async (dispatch, getState) => {

    try {
        dispatch({type:USER_DELETE_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState()

        console.log(userInfo)
        const config = {
            headers:{
            'Content-type':"application/json",
            Authorization : `Bearer ${userInfo.token}`,
            }
        }
    
        const {data} = await axios.delete(`/api/users/delete/${id}/`,config)

        console.log(data)

        dispatch({type:USER_DELETE_SUCCESS, payload:data})
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }

}

export const updateUser = (user) => async (dispatch, getState) => {

    try {
        dispatch({type:USER_UPDATE_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState()

        console.log(userInfo)
        const config = {
            headers:{
            'Content-type':"application/json",
            Authorization : `Bearer ${userInfo.token}`,
            }
        }
    
        const {data} = await axios.put(`/api/users/update/${user._id}/`,user,config)

        console.log(data)

        dispatch({type:USER_UPDATE_SUCCESS})
        dispatch({type:USER_DETAILS_SUCCESS, payload:data})
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }

}
