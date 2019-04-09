
var data = {
	title: 'Temat Kursu',
	description: 'Opis kursu...',
	image: 'http://placehold.it/150x150',
	author: 'Testowy Autor',
	duration: '6 godz',
	is_new: true,
	is_promo: true
}

var course = (
  	<div className="media course">

  		{/* Course media column */}
  		<div className="media-left">
  			<img src={data.image} alt="cover" />
  		</div>

  		{/* Course content column */}
  		<div className="media-body">
	  		<h3>{data.title} {data.is_new? <span className="badge badge-secondary">Nowy!</span> : null}</h3>
  			<p>{data.description}</p>

	  		{/* Promotion */}
  			{data.is_promo? <b>Kurs jest w PROMOCJI!</b> : null }
  		</div>

	  	{/* Course details column */}
  		<div className="media-right">
		  	<table className="table course_details">
		  		<tbody>
			  		<tr>
			  			<th>Autor</th>
			  			<td>{data.author}</td>
		  			</tr>
			  		<tr>
			  			<th>Czas trwania</th>
			  			<td>{data.duration}</td>
		  			</tr>
		  		</tbody>
		  	</table>
	  	</div>
	</div>
)

ReactDOM.render(course, document.getElementById('root'))	