
const Tabela = ({data, city, search}) => {

	let displayData = data && data.filter(item => item.city === city)
  if (displayData && search) {
    displayData = displayData.filter(item => item.lokal.toLowerCase().includes(search.toLowerCase()))
  }
  if (displayData) displayData.sort((a, b) => b.cena_diff_percent - a.cena_diff_percent)

	return (
		<div className='table'>
			<table>
				<thead>
					<tr>
						<th>Restavracija</th>
						<th>"Vrednost obroka"</th>
						<th>Povečanje (%)</th>
						<th>Povečanje</th>
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
	)
}

export default Tabela