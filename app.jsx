var CourseMedia = ({data}) => ( <img src={data.image} alt="cover" />)

var NewLabel = ({data}) => ( data.is_new? <span className="badge badge-secondary">Nowy!</span> : null)

var CoursePromoLabel = ({data}) => ( data.is_promo? <b>Kurs jest w PROMOCJI!</b> : null)

var Button = (props) => ( 
	<button className="btn btn-outline-secondary">
		{props.icon? <span className={ "glyphicon glyphicon-" + props.icon }></span> : null}
		{' '}
		{props.label}
	</button>
)

var CourseActions = ({data}) => (
	<div className="btn-group pull-right">
		<Button label="Szczególy kursu" />
		<Button label="Dodaj do ulubionych" icon="star" />
		<Button label="Dodaj do koszyka" icon="shopping-cart" />
	</div>
)

var CourseDetails = ({data}) => (
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

var Course = (props) => {
	var {data} = props;

	return (
	  	<div className="media course">

	  		{/* Course media column */}
	  		<div className="media-left">
	  			<CourseMedia {...props} />
	  		</div>

	  		{/* Course content column */}
	  		<div className="media-body">
		  		<h3>{data.title} <NewLabel {...props} /></h3>
	  			<p>{data.description}</p>

		  		{/* Promotion */}
	  			<CoursePromoLabel {...props} />

		  		{/* Course Actions */}
		  		<CourseActions {...props} />
	  		</div>

		  	{/* Course details column */}
	  		<div className="media-right">
	  			<CourseDetails {...props} />
		  	</div>
		</div>
	)
}

var CoursesList = (props) => {
	var list = props.list;

	return (
		<div>
			{list.map((data) => <Course data={data} key={data.id} />)}
		</div>
	)
}


var list = [], page = 1, perpage = 3;
document.getElementById('show_more').addEventListener('click', function(){
  page++;
  update();
})

function update(){
    var count = page * perpage;
	list = courses_data.slice(0,count);
	
	ReactDOM.render(<CoursesList list={list} />, document.getElementById('root'));
}
update();	

	


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