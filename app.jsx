
var data = {
	title: 'Temat Kursu',
	description: 'Opis kursu...',
	image: 'http://placehold.it/150x150',
	is_new: true,
	is_promo: true
}

var course = (
  	<div className="media">
  		<div className="media-left">
  			<img src={data.image} alt="cover" />
  		</div>
  		<div className="media-body">
	  		<h3>{data.title} {data.is_new? <span className="label label-default">Nowy!</span> : null}</h3>
  			<p>{data.description}</p>
  			{data.is_promo? <b>Kurs jest w PROMOCJI!</b> : null }
  		</div>
	</div>
)

ReactDOM.render(course, document.getElementById('root'))