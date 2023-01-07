import { useState, useEffect } from 'react';

import rawData from './data/restavracije.json';
import img_doplacila from './images/histogram-doplacil.png';
import img_povecanja_doplacil from './images/histogram-povecanja-doplacil.png';

import Tabela from './components/Tabela';

const mesta = ['LJUBLJANA', 'MARIBOR', 'KOPER/CAPODISTRIA', 'NOVO MESTO', 'CELJE', 'KRANJ', 'DOMŽALE', 'MURSKA SOBOTA', 'SLOVENJ GRADEC', 'IZOLA/ISOLA', 'NOVA GORICA', 'JESENICE', 'KRŠKO', 'PTUJ', 'VELENJE', 'ZAGORJE OB SAVI', 'ŠKOFJA LOKA', 'BREŽICE', 'SLOVENSKE KONJICE', 'TRBOVLJE', 'BLED', 'HOČE', 'PORTOROŽ/PORTOROSE', 'RADOVLJICA', 'RAVNE NA KOROŠKEM', 'ROGAŠKA SLATINA', 'TREBNJE', 'LOGATEC']

function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState('LJUBLJANA');
  const [search, setSearch] = useState('');
  const [attribute, setAttribute] = useState('cena');
  const [showMore, setShowMore] = useState(false);

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
          dobijo restavracije za obrok zdaj v povprečju <strong>30 %</strong> več kot lani.
          {!showMore && <small><a className='underline' onClick={() => setShowMore(true)}>Pokaži več</a></small>}
        </p>

        {showMore &&
        <>
          <p>Včasih je maksimalno doplačilo <strong className='ok'>4,18 €</strong> zaračunavala približno vsaka <strong className='ok'>osma</strong> restavracija, 
            zdaj ko le-to znaša <strong>5,5 €</strong> pa že skoraj vsaka <strong>četrta</strong>. </p>

          <p>Število lokalov, ki ponujajo obroke brez doplačila, pa je padlo <strong>s 15 na 6</strong>.</p>

          <h3>Povišanje doplačil</h3>
          <p>Prikaz števila restavracij, ki so doplačilo povišale za določeno vrednost:</p>
          <img src={img_povecanja_doplacil} alt="Povišanje doplačil" />
          
          <h3>Doplačila lani in zdaj</h3>
          <p>Prikaz števila resstavracij z določenim doplačilom lani (modro) in letos (rdeče). 
            Navpični črti predstavljata povprečno doplačilo, ki po novem znaša skoraj toliko, kot je včasih maksimalno:</p>
          <img src={img_doplacila} alt="Doplačila lani in zdaj" />

          <p>Avtor strani: <a className='underline' href="https://www.facebook.com/tim.kmecl/" target="_blank" rel="noopener noreferrer">Tim Kmecl</a>.
            Izvorne podatke si lahko ogledate in prenesete <a className='underline' href="https://github.com/timkmecl/studentska-prehrana-scrapper-comparison/blob/master/data/restavracije.csv">tukaj</a>. 
            <small><a className='underline' onClick={() => {setShowMore(false); window.scrollTo(0, 0);}}>Pokaži manj</a></small>
          </p>
        </>
        }
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
		    <p>Website created by <a href="https://www.facebook.com/tim.kmecl/" target="_blank" rel="noopener noreferrer">Tim Kmecl</a></p>
	    </div>
    </div>
  );
}

export default App;
