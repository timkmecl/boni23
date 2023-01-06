import { useState, useEffect } from 'react';

import rawData from './data/restavracije.json';

import Tabela from './components/Tabela';

const mesta = ['LJUBLJANA', 'MARIBOR', 'KOPER/CAPODISTRIA', 'NOVO MESTO', 'CELJE', 'KRANJ', 'DOMŽALE', 'MURSKA SOBOTA', 'SLOVENJ GRADEC', 'IZOLA/ISOLA', 'NOVA GORICA', 'JESENICE', 'KRŠKO', 'PTUJ', 'VELENJE', 'ZAGORJE OB SAVI', 'ŠKOFJA LOKA', 'BREŽICE', 'SLOVENSKE KONJICE', 'TRBOVLJE', 'BLED', 'HOČE', 'PORTOROŽ/PORTOROSE', 'RADOVLJICA', 'RAVNE NA KOROŠKEM', 'ROGAŠKA SLATINA', 'TREBNJE', 'LOGATEC']

function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState('LJUBLJANA');
  const [search, setSearch] = useState('');
  const [attribute, setAttribute] = useState('cena');

  useEffect(() => {
    setData(rawData.filter(item => item.cena && item.cena_old)
      .map(item => {
        if (!item.doplacilo_diff_percent && item.doplacilo_old === 0) {
          item.doplacilo_diff_percent = item.doplacilo_diff === 0 ? 0 : Infinity;
        }
        return item;
      })
    )
  }, []);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <div className='main'>
        <h1>Stanje študentske prehrane 2023</h1>
        <p>S 1. januarjem se je vrednost bona zvišala za <strong className='ok'>0,68 €</strong>. 
          Namesto ugodnejših cen za študente pa se je povprečno doplačilo zvišalo za <strong>1,08 € (35 %)</strong> </p>
        <p>Ob <strong>10,3 %</strong> letni inflaciji oz. <strong>18,6 %</strong> inflaciji cen hrane in pijače
          dobijo restavracije za obrok zdaj v povprečju <strong>30 %</strong> več kot lani.</p>
      </div>

      <div className='search'>
        <p>
          <label htmlFor="mesta">Izberi mesto: </label>
          <select name="mesta" id="mesta" value={city} onChange={handleCityChange} >
            {mesta.map((item, index) => {
              return <option key={index} value={item}>{item}</option>
            })}
          </select>
        </p>

        <p>
          <label htmlFor="search">Išči restavracijo: </label>
          <input type="search" name="search" id="search" value={search} onChange={handleSearchChange}/>
        </p>

        <p>
          <a onClick={() => setAttribute('cena')} className={attribute==='cena' ? 'selected' : ''}>Cena</a> 
           {' | '}
           <a onClick={() => setAttribute('doplacilo')} className={attribute==='doplacilo' ? 'selected' : ''} >Doplačilo</a>
        </p>
        
        <p className='disclaimer'>
            Podatki so zgolj informativne narave, ne jamčim za njihovo točnost in popolnost.
        </p>
      </div>

      {
        data && <Tabela data={data} city={city} search={search} attribute={attribute} />
      }

      <div id="created-by">
		    <p>Website created by <a href="https://www.facebook.com/tim.kmecl/">Tim Kmecl</a></p>
	    </div>
    </div>
  );
}

export default App;
