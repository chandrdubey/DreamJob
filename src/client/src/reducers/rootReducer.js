const initState = {
    userType: false,
    currentUser:{},
    isLoggedIn:false,
    isLoading:false,
}
const rootReducer = (state = initState, action) =>{
    switch (action.type)  {
        case 'SIGN IN' : {
           return{
               ...state,
               currentUser:  action.payload,
               isLoggedIn: true,
               
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
         case 'ALL JOBS RECRUITER' : {
            return{
                ...state,
                recruiterJobs : action.payload
            }        
         }
         case 'LOGOUT' :{
            return{
                ...state,
                currentUser :{},
                isLoggedIn: false
            }
        }
        default : {
            return state
        }
    }
}
export default rootReducer;