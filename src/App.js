import { useState, useEffect } from 'react';
import axios from 'axios';

const mesta = ['LJUBLJANA', 'PTUJ', 'MARIBOR', 'KOPER/CAPODISTRIA', 'ROGAŠKA SLATINA', 'JESENICE', 'PORTOROŽ/PORTOROSE', 'NOVO MESTO', 'ŠKOFJA LOKA', 'RAVNE NA KOROŠKEM', 'SLOVENSKE KONJICE', 'CELJE', 'TREBNJE', 'SLOVENJ GRADEC', 'RADOVLJICA', 'KRANJ', 'HOČE', 'NOVA GORICA', 'DOMŽALE', 'MURSKA SOBOTA', 'VELENJE', 'BLED', 'KRŠKO', 'IZOLA/ISOLA', 'ZAGORJE OB SAVI', 'TRBOVLJE', 'LOGATEC', 'BREŽICE']

function App() {
  const [data, setData] = useState(null);
  const [mesto, setMesto] = useState('LJUBLJANA');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/restavracije.json').then((response) => {
      let d = response.data
      d = d.filter(item => item.cena && item.cena_old)
      setData(d);
    });
  }, []);

  const handleMestoChange = (e) => {
    setMesto(e.target.value);
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  let displayData = data && data.filter(item => item.city === mesto)
  if (displayData && search) {
    displayData = displayData.filter(item => item.lokal.toLowerCase().includes(search.toLowerCase()))
  }
  if (displayData) displayData.sort((a, b) => b.cena_diff_percent - a.cena_diff_percent)

  return (
    <div className="App">
      <div className='main'>
        <h1>Stanje študentske prehrane 2023</h1>
        <p>S 1. januarjem se je vrednost bona <em>zvišala</em> za <strong>0,68 €</strong>. 
          Namesto ugodnejših cen za študente pa se je povprečno doplačilo <em>zvišalo</em> za <strong>1,08 €</strong> (<strong>35 %</strong>) </p>
        <p>Ob <strong>10,3 %</strong> letni inflaciji oz. <strong>18,6 %</strong> inflaciji cen hrane in pijače
          dobijo restavracije za obrok zdaj v povprečju <strong>30 %</strong> več kot lani.</p>
      </div>
      <div className='search'>
        <p>
          <label htmlFor="mesta">Izberi mesto: </label>
          <select name="mesta" id="mesta" value={mesto} onChange={handleMestoChange} >
            {mesta.map((item, index) => {
              return <option key={index} value={item}>{item}</option>
            })}
          </select>
        </p>
        <p>
          <label htmlFor="search">Išči restavracijo: </label>
          <input type="search" name="search" id="search" value={search} onChange={handleSearchChange}/>
        </p>
      </div>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th>Restavracija</th>
              <th>"Vrednost obroka"</th>
              <th>Povišanje (%)</th>
              <th>Povišanje</th>
            </tr>
          </thead>
          <tbody>
            {displayData && displayData.map((item, index) => {
              return (
                <tr key={index}>
                  <td className='ime'>
                    <a href={`https://www.studentska-prehrana.si/sl/restaurant/Details/${item.posid}`} target="_blank" rel="noreferrer">
                      {item.lokal}
                    </a>
                  </td>
                  <td>{item.cena.toFixed(2)} €</td>
                  <td className={`procent ${item.cena_diff_percent > 18.6 ? 'red' : ''} ${(item.doplacilo === 0) ? 'free' : ''}`}>
                    {item.cena_diff_percent.toFixed(0)} %
                  </td>
                  <td>{item.cena_diff.toFixed(2)} €</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
