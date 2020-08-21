import React, {Component} from 'react';
import SatSetting from './SatSetting';
import SatelliteList from './SatelliteList';
import { NEARBY_SATELLITE, STARLINK_CATEGORY, SAT_API_KEY } from '../constants';
import Axios from 'axios';

class Main extends Component {

    constructor(){
        super();
        this.state = {
            loading : false,
        }
      }
  


    showNearbySatellite = (setting) => {
        console.log("in main.js" , setting)
        this.fetchSatellite(setting);
      }
  
      fetchSatellite = (setting) => {
        const {observerLat, observerLong, observerAlt, radius} = setting;
        const url = `${NEARBY_SATELLITE}/${observerLat}/${observerLong}/${observerAlt}/${radius}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;
        console.log(url);
        Axios.get(url)
            .then(response => {
                this.setState({
                    satInfo: response.data,
                    loading: false,
                })
            })
            .catch(error => {
                console.log('err in fetch satellite -> ', error);
                this.setState( (preState) => {return {loading : !preState.loading}});

            })
            this.setState( {loading: true});

      }


    render() {
        return (
            <div className='main'>
                <div className="left-side">
                    <SatSetting onShow={this.showNearbySatellite} />
                    <SatelliteList satInfo={this.state.satInfo} loading={this.state.loading}/>
                </div>
                <div className="right-side">
                    right
                </div>
            </div>
        );
    }
}
export default Main;