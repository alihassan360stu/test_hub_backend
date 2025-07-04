const negative = ({data={},message="",status=false})=>{
    return {
        data:data,
        status:status,
        message:message
    }
}
const positive = ({data={},message="",status=true})=>{
    return {
        data:data,
        status:status,
        message:message
    }
}

module.exports = {
    positive,
    negative
}