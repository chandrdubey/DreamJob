const initState = {
    userType:0,
    currentUser:{},
    isLoggedIn:false,
    recruiterJobs:[],
    isLoading:false,
}
const rootReducer = (state = initState, action) =>{
    switch (action.type)  {
        case 'SIGN IN' : {
           return{
               ...state,
               currentUser:  action.payload,
               isLoading:    false
           }
        }
        case 'LOADING' : {
            return{
                ...state,
                isLoading : true
          
            }        
         }
         case 'CHANGE USER TYPE' : {
            return{
                ...state,
                userType : action.payload
            }        
         }
        default : {
            return state
        }
    }
}
export default rootReducer;