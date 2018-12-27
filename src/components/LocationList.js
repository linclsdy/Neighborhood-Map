import React from 'react'
import '../App.css'

class LocationList extends React.Component {


    render() {
        const { query, updateQuery, onLocationClicked, locationList } = this.props

        return (
            <div id = 'locationList'>
            <input 
                id = 'input-box' 
                type = 'text' 
                placeholder = 'Enter Museum Name' 
                aria-label = "text filter"
                value = {query}
                onChange = {e => updateQuery(e.target.value)}
                tabIndex = {0}
            />
            <ul 
                aria-label = 'List of Places'>
                {locationList.map((location, index) =>
                    <li 
                    key={location.name}
                    //tabIndex={ !this.state.searchHidden ? '0' : '-1' }
                    
                    onClick = {(e) => onLocationClicked(location)}
                    tabIndex = {0}
                    > 
                    {location.name}

                    </li>
                )}
            </ul>
            </div>
        );
    }
}

export default LocationList