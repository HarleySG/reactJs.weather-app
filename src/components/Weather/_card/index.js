import React, { Component } from "react";
import PropTypes from "prop-types";
/**@libraries */
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
/**@services */
import { fetchWeatherDataBy } from "services";
/**@components */
import CardDataHeader from "./_header";
import CardDataBody from "./_body";
import AlertComponent from "components/AlertComponent";
/**@styles */
import "./WeatherCardData.css";
// https://www.udemy.com/share/100054AkAad1lUQHQ=/?xref=E0AYcFhVQ3kJSV82AT0GJVUWTx4dChQ%2BVFE=

class WeatherCardData extends Component {
    constructor(props) {
        super(props);

        const { city } = props;
        this.state = {
            error: null,
            notice: {},
            city: city,
            data: null
        };
    }

    handleUpdateData = () => {
        const idCity = this.state.city.id;
        fetchWeatherDataBy(idCity)
            .then(data => {
                this.setState(data);
            })
            .catch(error => {
                this.setState({
                    error: true,
                    notice: {
                        type: "Error",
                        title: "Error en consulta",
                        body: error.message
                    }
                });
            });
    };

    componentDidMount() {
        this.handleUpdateData();
    }

    render() {
        const { onWeatherLocationClick } = this.props;
        const { city, data, error, notice } = this.state;
        const { name } = city;
        return (
            <Card
                onClick={onWeatherLocationClick}
                className="c-weather_location-item c-location_card"
            >
                <CardDataHeader city={name} />
                <CardContent className="c-location_card-body">
                    {error ? (
                        <AlertComponent msg={notice} />
                    ) : data ? (
                        <CardDataBody data={data} />
                    ) : (
                        <LinearProgress />
                    )}
                </CardContent>
            </Card>
        );
    }
}

WeatherCardData.propTypes = {
    city: PropTypes.object.isRequired /** @Object */,
    weatherLocationOnClick: PropTypes.func /** @Function */
};

export default WeatherCardData;
