var CourseMedia = function(data){
	return <img src={data.image} alt="cover" />;
}

var NewLabel = function(data){
	return data.is_new? <span className="badge badge-secondary">Nowy!</span> : null;
}

var CoursePromoLabel = function(data){
	return data.is_promo? <b>Kurs jest w PROMOCJI!</b> : null;
}

var CourseActions = function(data){
	return (
		<div className="btn-group">
			<button className="btn btn-secondary">Szczególy kursu</button>
			<button className="btn btn-secondary">Dodaj do ulubionych</button>
			<button className="btn btn-secondary">Dodaj do koszyka</button>
		</div>
	) 
}

var CourseDetails = function(data){
	return (
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
	)
}

var Course = function(data){
	return (
	  	<div className="media course">

	  		{/* Course media column */}
	  		<div className="media-left">
	  			{ CourseMedia(data) }
	  		</div>

	  		{/* Course content column */}
	  		<div className="media-body">
		  		<h3>{data.title} {NewLabel(data)}</h3>
	  			<p>{data.description}</p>

		  		{/* Promotion */}
	  			{ CoursePromoLabel(data) }

		  		{/* Course Actions */}
		  		{ CourseActions(data) }
	  		</div>

		  	{/* Course details column */}
	  		<div className="media-right">
	  			{ CourseDetails(data) }
		  	</div>
		</div>
	)
}



var CoursesList = function(list){
	return (
		<div>
			{list.map(function(data){
				return <div key={data.id}>{ Course(data) }</div>
			})}
		</div>
	)
}

var list = courses_data.slice(0,8);

ReactDOM.render(CoursesList(list), document.getElementById('root'))	

	


// Wygląd szablonu przed zmianami


// var data = {
// 	title: 'Temat Kursu',
// 	description: 'Opis kursu...',
// 	image: 'http://placehold.it/150x150',
// 	author: 'Testowy Autor',
// 	duration: '6 godz',
// 	is_new: true,
// 	is_promo: true
// }

// var course = (
//   	<div className="media course">

//   		{/* Course media column */}
//   		<div className="media-left">
//   			<img src={data.image} alt="cover" />
//   		</div>

//   		{/* Course content column */}
//   		<div className="media-body">
// 	  		<h3>{data.title} {data.is_new? <span className="badge badge-secondary">Nowy!</span> : null}</h3>
//   			<p>{data.description}</p>

// 	  		{/* Promotion */}
//   			{data.is_promo? <b>Kurs jest w PROMOCJI!</b> : null }
//   		</div>

// 	  	{/* Course details column */}
//   		<div className="media-right">
// 		  	<table className="table course_details">
// 		  		<tbody>
// 			  		<tr>
// 			  			<th>Autor</th>
// 			  			<td>{data.author}</td>
// 		  			</tr>
// 			  		<tr>
// 			  			<th>Czas trwania</th>
// 			  			<td>{data.duration}</td>
// 		  			</tr>
// 		  		</tbody>
// 		  	</table>
// 	  	</div>
// 	</div>
// )

// ReactDOM.render(course, document.getElementById('root'))	