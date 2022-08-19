import React from "react";

const Lists = ({id, img, name, population, region, capital}) => {

    const popul = population.toLocaleString("en-US")
    return (
        <li className="col-md-3" key={id}>
        <div className="card">
        <img src={img} className="card-img-top" alt={name} />
        <div className="card-body">
            <p className="card-text">{name}</p>
            <p className="card-text">Population: {popul}</p>
            <p className="card-text">Region: {region}</p>
            <p className="card-text">Capital: {capital}</p>
        </div>
    </div>
</li>
    )
}

export default Lists;