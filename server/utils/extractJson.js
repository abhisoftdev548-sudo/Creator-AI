
const extractJson = async (rawData) =>{
    if(!rawData){
        return
    }
    try{

        const cleaned  = rawData.replace(/```json/gi, "").replace(/```/g, "").trim();
        const firstBrace = cleaned.indexOf('{')
    const closedBrace = cleaned.lastIndexOf('}')
    if(firstBrace === -1 || closedBrace === -1) return null;
    const jsonString = cleaned.slice(firstBrace, closedBrace+1)
    return JSON.parse(jsonString)
}catch(error){
    console.log(error)
}
}
export default extractJson