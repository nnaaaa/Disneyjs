// import { sum } from '../src';

import axios from 'axios';
import { Client, MarkdownBuilder, MessageClient } from '../src/index'

let client: Client;


describe('test commands', () => {

  test('getToday', (done) => {
    const key = '589f71e9a8e3406d99034020221207';

    class WeatherClient extends MessageClient {
      async getToday(country: string) {
        try {
          const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${country}&days=7`)
          const getIcon = () => {
            switch (res.data.current.condition.text) {
              case 'Sunny':
                return '☀️';
              case 'Cloudy':
                return '☁️';
              case 'Rain':
                return '🌧';
              case 'Snow':
                return '🌨';
              case 'Thunderstorm':
                return '⛈';
              case 'Mist':
                return '🌫';
              default:
                return '🌧';
            }
          }
          this.message.send({
            content: MarkdownBuilder.tag`
          ### ${res.data.location.name} ${getIcon()}
          Current temperature is ${res.data.current.temp_c}°C
        `,
          })
          done()
        } catch (e) {
          console.error(e)
        }
      }
    }
    client = new WeatherClient();

    client.login("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RJZCI6ImQ5YTA2NmNmLTdkYzUtNGNiNy04YWY5LTQ2ZDk1YWM0YWUzZCIsImlhdCI6MTY1NzU5ODIzN30.qyaGWlf2tyC5vNKGyjvjmz-o7KvOZr1W8khpOuTFLes")
    
  })
});
