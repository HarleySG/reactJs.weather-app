import React, { Component } from "react";
import PropTypes from 'prop-types'
// import { Grid } from 'react-flexbox-grid';

import WeatherLocation from "./WeatherLocation";

import "./LocationList.css"

/**
 * Versión Funcional
 * 
    const LocationList = ({ cities, onSelectedLocation }) => {
    
        const handelWeatherLocationClick = (city) => {
            console.log('handelWeatherLocationClick ', city);
            onSelectedLocation(city)

        };
        const mapCitiesToComponents = (cities) => ( cities.map(
            (city, index) => (
                <WeatherLocation
                    city={city}
                    key={`index_${city}`}
                    onWeatherLocationClick={() => this.handelWeatherLocationClick(city) }
                />
            )
        ));

        return (
            <div>
                {
                    mapCitiesToComponents(cities)
                }
            </div>
        )
    }
 */

class LocationList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            cities : props.cities
        }
    };
    /**
     * Comunicación entre componentes (burbujeo) ascendente
     *
     * 4- Definir la función que ejecuta el componente 
     * y en esta ejecutar la propiedad que recibira una función
     * conectandose así con el componente padre.
     * 
     * Ej. this.props.onSelectedLocation(city)
    */
    handelWeatherLocationClick = (city) => {
        console.log('handelWeatherLocationClick ', city);
        this.props.onSelectedLocation(city)
        
    };

    mapCitiesToComponents = (cities) => ( cities.map(
        (city, index) => (
            <WeatherLocation 
                city={city} 
                key={`index_${city}`}
                /** 
                 * Comunicación entre componentes (burbujeo) ascendente
                 * 
                 * 3- Incluir la propiedad definida en el componente y pasarle la función esperada.
                */
                onWeatherLocationClick={() => this.handelWeatherLocationClick(city) }
            />
        )
    ));

    render() {
        const { cities } = this.state;
        return (
            <div className="c-weather_location">
                {
                    this.mapCitiesToComponents(cities)
                }
            </div>
        )
    }
};

LocationList.propTypes = {
    cities: PropTypes.array.isRequired,
    /**
     * Comunicación entre componentes (burbujeo) ascendente
     *
     * 5- Definir el tipo de parametro que vamos a recibir, en este caso @Funcion 
     * Ej. onSelectedLocation: PropTypes.func
    */
    onSelectedLocation: PropTypes.func,
}

export default LocationList;