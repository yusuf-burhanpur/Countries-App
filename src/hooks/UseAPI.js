import {useState, useEffect} from "react";
import countries from "../API/countries";

const useAPI =  (input) => {
const [data, setData] = useState([])
const [err, setErr] = useState("")

const searchApi = async (input) => {
    try {
      const response = await countries.get(`${input}`, {
        params: {
          fields: "name,topLevelDomain,capital,region,population,borders,currencies,languages,flags,subregion,nativeName,numericCode",
        }
      })
      setData(response.data)
      
    } catch (error) {
        setErr("Something Went Wrong!")
    }
  };

useEffect(() => {
    if (input.name === "" && input.region === "Filter By Region") {
      searchApi("/all")
    }   else if (input.name && input.region === "Filter By Region") {
      searchApi(`/name/${input.name}`)
    } else if (input.region !== "Filter By Region" && input.name === ""){
      searchApi(`/region/${input.region}`)
    } else if (input.region !== "Filter By Region" && input.name) {
      searchApi(`/region/${input.region}`)
    }
  }, [input]);

  return [data, err];

}
  
export default useAPI;