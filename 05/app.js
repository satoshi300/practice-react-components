import React from "react";
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

class App extends React.Component {
    state = {
        data: [],
    }
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.state;
        if (data) {
            // renderuj dopiero jak pobierzesz dane z API

            return <h1>informacje o pogodzie...{this.data}</h1>
        }

        // nic nie renderuj
        return null;
    }
    componentDidMount() {
        const { latVal, lngVal } = this.state;
        const keyEl = 'deeaed3434f040bab058e759479f90f5';

        const promise = fetch(`https://api.weatherbit.io/v2.0/current?key=${keyEl}&lang=pl&lat=${latVal}&lon=${lngVal}&units=I&description`);

        promise
            .then(resp => {
                if (resp.ok) { return resp.json(); }
                return Promise.reject(resp);
            })
            .then(resp => {

                console.log(resp.data[0].lat, resp.data[0].lon, resp.data[0].temp, resp.data[0].weather.description)
            })
            .catch(err => console.error(err))
            .finally(() => {
                console.log('Odpytywanie API zakończone!')
            });
    }
}

root.render(<App />)