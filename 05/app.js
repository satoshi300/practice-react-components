import React from "react";
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

class Weather extends React.Component {
    state = {
        data: null,
        lat: '',
        lon: '',

    }
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.state;
        if (data) {
            // renderuj dopiero jak pobierzesz dane z API

            return (
                <div>
                    <h1>informacje o pogodzie...</h1>
                    <p>Szerokosc: {data.lat}</p>
                    <p>Wysokosc: {data.lon}</p>
                    <p>Temperatura: {data.temp}</p>
                    <p>Opis pogody: {data.weather.description}</p>

                </div>
            )
            //
        }

        // nic nie renderuj
        return null;
    }
    componentDidMount() {
        const { lat, lon } = this.props;
        const keyEl = '5fa3fd02aff04001b94fbab40da35a0a';
        // const latVal = 52.232222;
        // const lonVal = 21.008333;
        const promise = fetch(`https://api.weatherbit.io/v2.0/current?key=${keyEl}&lang=pl&lat=${lat}&lon=${lon}&units=M&description`)
        promise
            .then(resp => {
                if (resp.ok) { return resp.json(); }
                return Promise.reject(resp);
            })
            .then((resp) => {
                this.setState({
                    data: resp.data[0],
                });
                // console.log(resp.data[0].lat, resp.data[0].lon, resp.data[0].temp, resp.data[0].weather.description)
            })
            .catch(err => console.error(err))
            .finally(() => {
                console.log('Odpytywanie API zakończone!')
            });
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Weather lat={52.232222} lon={21.008333} />
            </div>
        )
    }
}

root.render(<App />)