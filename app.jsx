
var data = {
	title: 'Temat Kursu',
	description: 'Opis kursu...',
	image: 'http://placehold.it/150x150'
}

var course = (
  	<div className="media">
  		<div className="media-left">
  			<img src={data.image} alt="cover" />
  		</div>
  		<div className="media-body">
	  		<h3>{data.title}</h3>
  			<p>{data.description}</p>
  		</div>
	</div>
)

ReactDOM.render(course, document.getElementById('root'))	