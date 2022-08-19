import React, {useState, useMemo } from "react";
import Pagination from "./Components/Pagination/Pagination";
import Lists from "./Components/Lists/List";
import useAPI from "./hooks/UseAPI";

let PageSize = 8;

function App() {
const [input, setInput] = useState({
    region: "Filter By Region",
    name: ""
})
const [data, err] = useAPI(input);
const [currentPage, setCurrentPage] = useState(1);
  const inputHandler = (event) => {
    setInput({
      ...input,
      name: event.target.value
    })
  }
  const selectHandler = (event) => {
    setInput({
      ...input,
      region: event.target.value
    })
  }
  console.log(err)
  // useEffect(() => {
  //   if (input.name === "" && input.region === "Filter By Region") {
  //     searchApi("/all")
  //   }   else if (input.name && input.region === "Filter By Region") {
  //     searchApi(`/name/${input.name}`)
  //   } else if (input.region !== "Filter By Region" && input.name === ""){
  //     searchApi(`/region/${input.region}`)
  //   } else if (input.region !== "Filter By Region" && input.name) {
  //     searchApi(`/region/${input.region}`)
  //   }
  // }, [input])
  // const searchApi = async (input) => {
  //   try {
  //     const response = await countries.get(`${input}`, {
  //       params: {
  //         fields: "name,topLevelDomain,capital,region,population,borders,currencies,languages,flags,subregion,nativeName,numericCode",
  //       }
  //     })
  //     setData(response.data)
      
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);


  return (
    <div className="container">
      <h1>Rest Countries Challenge</h1>
      <input type="text" onChange={inputHandler} />
      <select className="form-select" aria-label="Default select example" onChange={selectHandler}>
        <option defaultValue="Filter By Region">Filter By Region</option>
        <option value="europe">Europe</option>
        <option value="americas">America</option>
        <option value="asia">Aisa</option>
      </select>
      <div className="row">
      {currentTableData.map(item => {
        return (<Lists 
                  key={item.numericCode}
                  img={`${item.flags.png}`}
                  name={item.name}
                  population={item.population}
                  capital={item.capital}
                  region={item.region}  
                  />)
      })}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
      </div>
    </div>
  );
}

export default App;
