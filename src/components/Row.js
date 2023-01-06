
const Row = ({ item, attribute }) => {
	if (attribute === 'doplacilo') {
		return (
			<tr key={item.posid}>
				<td className='ime'>
					<a href={`https://www.studentska-prehrana.si/sl/restaurant/Details/${item.posid}`} target="_blank" rel="noreferrer">
						{item.lokal}
					</a>
				</td>
				
				<td>{item.doplacilo.toFixed(2)} €</td>

				<td className={`procent ${item.doplacilo_diff >= 0.5 ? 'red' : ''}`}>
					{item.doplacilo_diff.toFixed(2)} €
				</td>

				<td>{item.doplacilo_old.toFixed(2)} €</td>
			</tr>
		)
	} else {
		return (
			<tr>
				<td className='ime'>
					<a href={`https://www.studentska-prehrana.si/sl/restaurant/Details/${item.posid}`} target="_blank" rel="noreferrer">
						{item.lokal}
					</a>
				</td>

				<td>{item.cena.toFixed(2)} €</td>	

				<td className={`procent ${item.cena_diff_percent > 18.6 ? 'red' : ''} ${(item.cena === 0) ? 'free' : ''}`}>
					{item.cena_diff_percent.toFixed(0)} %
				</td>

				<td>{item.cena_diff.toFixed(2)} €</td>
			</tr>
		)
	}
}


export default Row;