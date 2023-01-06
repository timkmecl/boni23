import Row from './Row'

const Tabela = ({data, city, search, attribute}) => {

	let displayData = data && data.filter(item => item.city === city)
  if (displayData && search) {
    displayData = displayData.filter(item => item.lokal.toLowerCase().includes(search.toLowerCase()))
  }
  if (displayData) {
		if (attribute === 'doplacilo') {
			displayData = displayData.sort((a, b) => b.doplacilo_diff - a.doplacilo_diff)
		} else {
			displayData = displayData.sort((a, b) => b.cena_diff_percent - a.cena_diff_percent)
		}
	}

	console.log(data[0], [`${attribute}_diff_percent`], data[0][`${attribute}_diff_percent`])
	return (
		<div className='table'>
			<table>
				<thead>
					{
						attribute === 'doplacilo' 
						? <tr>
								<th>Restavracija</th>
								<th>Doplačilo</th>
								<th>Povečanje</th>
								<th>Doplačilo lani</th>
							</tr>
						: <tr>
								<th>Restavracija</th>
								<th>"Vrednost obroka"</th>
								<th>Povečanje (%)</th>
								<th>Povečanje</th>
							</tr>
					}
				</thead>
				<tbody>
					{displayData && displayData.map(item => <Row key={item.posid} item={item} attribute={attribute} />)}
				</tbody>
			</table>
		</div>
	)
}

export default Tabela