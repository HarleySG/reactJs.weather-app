import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import { Grid } from 'react-flexbox-grid';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
/* SERVICE */
import { url_forecast, api_key } from '../../constants/const.weatherAPI';
import fetchService from '../../services/service.fetch';
import transformForcastQueryService from '../../services/service.transformForcastQuery';
/* COMPONENTS */
import ForeCastItem from '../ForeCastItem'


const days = [
    'Lunes',
    'martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
]

class ForeCastExtended extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: this.props.isOpen || false,
            city: {
                cityId: this.props.cityId,
                name: '',
                country: '',
                data: null,
            }
        }
    }

    handleCloseModal = () => {
        if( this.state.isOpen === true ) {
            this.setState({
                isOpen: !this.state.isOpen,
                city: {
                    cityId: null,
                    data: null
                },
            });
        }
    }

    renderForecasItemDays() {
        return days.map(day => (<ForeCastItem key={day} weekDay={day} hour={12}></ForeCastItem>))
    }

    handleFetchForUpdate(idCity) {
        fetchService(`${url_forecast}?id=${idCity}&appid=${api_key}`)
        .then(resp => {
            const data = transformForcastQueryService(resp);
            // console.log(resp, data);
            
            this.setState({city: {
                data: data,
                cityId: idCity,
                name: resp.city.name,
                country: resp.city.country,
            }});
        })
        .catch(e => console.error(e));
    }
    
    componentDidMount() {
        const { cityId } = this.state.city
        this.handleFetchForUpdate(cityId);
    }

    componentDidUpdate(prevProps, prevState) {
        const { cityId } = this.props;
        if (prevProps.cityId !== cityId) {
            this.handleFetchForUpdate(cityId);
        }
        if (prevProps.isOpen !== this.props.isOpen) {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
    }

    render() {

        const { data, name, country } = this.state.city;
        const { isOpen } = this.state;
        // console.log(data);
        return (
            <Fragment>
                <div className={`c-weather_details ${isOpen ? 'is-visible' : ''}`}>
                    <div className={`c-weather_details-overlay`} onClick={this.handleCloseModal}></div>
                    <div className={`c-weather_details-body`}>
                        <AppBar position="sticky">
                            <Grid>
                                <Toolbar>
                                    <Typography variant="subtitle1" color="inherit">
                                        {data ? `${name}, ${country}`  : 'cargando....'}
                                    </Typography>
                                </Toolbar>
                            </Grid>
                        </AppBar>
                        <Grid className={`c-weather_details-content`}>
                            { data ? this.renderForecasItemDays() : 'cargando....' }
                        </Grid>
                    </div>
                </div>
            </Fragment>
        );
        
    }
}

ForeCastExtended.propTypes = {
    cityId: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired
}

export default ForeCastExtended;