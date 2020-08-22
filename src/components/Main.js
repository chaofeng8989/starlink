import React, {Component} from 'react';
import SatSetting from './SatSetting';
import SatelliteList from './SatelliteList';
import { NEARBY_SATELLITE, STARLINK_CATEGORY, SAT_API_KEY } from '../constants';
import Axios from 'axios';
import WorldMap from './WorldMap';

class Main extends Component {

    constructor(){
        super();
        this.state = {
            loading : false,
            selected : [],
        }
      }
  

      trackOnClick = () => {
        console.log(`tracking ${this.state.selected}`);
      }
  
      addOrRemove = (item, status) => {
        let list = this.state.selected;
        const found = list.some( entry => entry.satid === item.satid);

        
        if(status && !found){
            list.push(item)
        }
  
        if(!status && found){
            list = list.filter( entry => entry.satid !== item.satid);
        }
        
        console.log("current selected list" , list);
        this.setState({
          selected: list
        })
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
                    selected: []
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
                    <SatelliteList 
                        satInfo={this.state.satInfo} 
                        loading={this.state.loading}
                        onSelectionChange={this.addOrRemove}
                        disableTrack={this.state.selected.length === 0}
                        trackOnclick={this.trackOnClick}
                        />
                </div>
                <div className="right-side">
                    <WorldMap />
                </div>
            </div>
        );
    }
}
export default Main;