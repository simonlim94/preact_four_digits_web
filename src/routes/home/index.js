import { h, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import axios from 'axios';

import style from './style';
import config from '../../config';

const ResultTable = () => {
  const [items, setItems] = useState([]);
  const data = { date: '2020-05-18 00:00:00' };
  const url = `${config.API_ROOT_URL}/result`;

  useEffect(() => {
    const result = axios({
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => setItems(res.data.items.result))
      .catch((e) => console.error(e));
  }, []);

  return (
    items.length > 0 && (
      <div>
        <table class={style.resultTable} cellSpacing={0}>
          <tr>
            <th width="50%">1st Prize:</th>
            <td width="50%">{items[0]}</td>
          </tr>
          <tr>
            <th width="50%">2nd Prize:</th>
            <td width="50%">{items[1]}</td>
          </tr>
          <tr>
            <th width="50%">3rd Prize:</th>
            <td width="50%">{items[2]}</td>
          </tr>
        </table>
        <br />
        <table class={style.resultTable} cellSpacing={0}>
          <tr>
            <th colSpan={5}>Consolation</th>
          </tr>
          <tr>
            {items.length > 0 &&
              items.slice(2, 7).map((item) => <td>{item}</td>)}
          </tr>
          <tr>
            {items.length > 0 &&
              items.slice(7, 12).map((item) => <td>{item}</td>)}
          </tr>
        </table>
        <br />
        <table class={style.resultTable} cellSpacing={0}>
          <tr>
            <th colSpan={5}>Special</th>
          </tr>
          <tr>
            {items.length > 0 &&
              items.slice(12, 17).map((item) => <td>{item}</td>)}
          </tr>
          <tr>
            {items.length > 0 &&
              items.slice(17, 22).map((item) => <td>{item}</td>)}
          </tr>
        </table>
      </div>
    )
  );
};

export default class Home extends Component {
  render() {
    return (
      <div class={`${style.home} page`}>
        <Card>
          <div class={style.cardHeader}>
            <h2 class=" mdc-typography--title">Today Result</h2>
          </div>
          {ResultTable()}
        </Card>
      </div>
    );
  }
}
