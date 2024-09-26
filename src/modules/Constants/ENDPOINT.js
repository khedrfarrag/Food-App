const BASEDURL = "https://upskilling-egypt.com:3006/api/v1";
export const BASEIMAGE = "https://upskilling-egypt.com:3006";


export const PATTERNEMAIL = {
    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    message: "Email should be valid ",
}
export const PATTERNPASSWORD = {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: "password should be valid Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
}

const BASEUSERS = `${BASEDURL}/UserRecipe`

export const USERSURL = {
    post: BASEUSERS,
    get: BASEUSERS,
    // getid:(id)=>`${BASEUSERS}/${id}`,
    delete: (id) => `${BASEUSERS}/${id}`,
    // put:(id)=>`${BASEUSERS}/${id}`

}


// user portal 

const BASEUSERPORTAL = `${BASEDURL}/Users`

export const USERPORTAL = {
    postLogin: `${BASEUSERPORTAL}/Login`,
    postRegister: `${BASEUSERPORTAL}/Register`,
    postCreateAdin: `${BASEUSERPORTAL}/Create`,
    delete: (id) => `${BASEUSERPORTAL}/${id}`,
    getid: (id) => `${BASEUSERPORTAL}/${id}`,
    putVerify: `${BASEUSERPORTAL}/verify`


}



const BASECATEGORY = `${BASEDURL}/Category/`
export const CATEGORY = {
    post: BASECATEGORY,
    get: BASECATEGORY,
    getid: (id) => `${BASECATEGORY}/${id}`,
    delete: (id) => `${BASECATEGORY}/${id}`,
    put: (id) => `${BASECATEGORY}/${id}`

}

const BASEDRECIPE = `${BASEDURL}/Recipe`
export const RECIPE = {
    post: BASEDRECIPE,
    get: BASEDRECIPE,
    getid: (id) => `${BASEDRECIPE}/${id}`,
    delete: (id) => `${BASEDRECIPE}/${id}`,
    put: (id) => `${BASEDRECIPE}/${id}`


}


const BASEDUSER = `${BASEDURL}/Users/`
export const USERRLIST = {
    get: BASEDUSER,
    Create:`${BASEDUSER}/Create`,



}


export const BASEDTAGID = `${BASEDURL}/tag/`