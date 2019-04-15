
const CoursesList = ({list}) => (
	<div>
		<h1> Kursy </h1>
		<hr />
		<div>
			{list.map((data) => <Course data={data} key={data.id} Details={CourseDetails}>
		  		{/* Promotion */}
	  			<CoursePromoLabel data={data} />

		  		{/* Course Actions */}
				<div className="btn-group pull-right">
					<Button label="Szczególy kursu" />
					<StateButton active={AppState.state.favourites_map[data.id]} 
						onActivate={()=>actions.addFavourite(data.id)} 
						onDeactivate={()=>actions.removeFavourite(data.id)}  />
				</div>
			</Course>)}
		</div>
	</div>
)

const FavouritesCoursesList = ({list}) => (
	<div>
		<h1> Ulubione Kursy </h1>
		<hr />
		<div>
			{list.length == 0? <p className="text-center">Brak kursów </p> : null }
			{list.map((data) => <Course data={data} key={data.id} Details={CourseDetails}>
		  		{/* Promotion */}
	  			<CoursePromoLabel data={data} />

		  		{/* Course Actions */}
				<div className="btn-group pull-right">
					<Button label="Szczególy kursu" />
					<StateButton active={AppState.state.favourites_map[data.id]}  
								onActivate={()=>actions.addFavourite(data.id)} 
								onDeactivate={()=>actions.removeFavourite(data.id)}  />
				</div>
			</Course>)}
		</div>
	</div>
)


const StateButton = React.createClass({

	getInitialState: function(){
		return {
			active: this.props.active
		}
	},

	getDefaultProps: function(){
		return {
			active: false,
			onActivate: function(){},
			onDeactivate: function(){}
		}
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({
			active: nextProps.active
		})
	},

	setActive: function(){
		this.setState({
			active: true
		})
		this.props.onActivate()
	},

	setInactive: function(){
		this.setState({
			active: false
		})
		this.props.onDeactivate()
	},

	render: function(){
		return (this.state.active?
			<Button label="Usuń z ulubionych" icon="star" onClick={this.setInactive} /> :
			<Button label="Dodaj do ulubionych" icon="star-empty" onClick={this.setActive} />
		)
	}

})

function StateStore(){
	this.state = {}

	this.dispatchEvents = ()=> {
		this.callback(this.state)
	}	

	this.callback = function(){};

	this.addListener = (callback) => {
		this.callback = callback;
	}

	this.createAction = function(handler){
		var state = this.state;
		return function(){
			handler.apply(state, arguments);

			AppState.dispatchEvents();
		}
	},

	this.createActions = function(handlersMap){
		var actions = {}
		for(let name in handlersMap){
			actions[name] = this.createAction(handlersMap[name])
		}
		return actions;
	}
}

var AppState = new StateStore()
AppState.state = {
	page: 1,
	courses: courses_data,
	courses_map: courses_data.reduce((map, course) => {
		map[course.id] = course;
		return map;
	},{}),
	list: courses_data.slice(0,3),
	favourites_list: [],
	favourites_map: {}
}

var actions = AppState.createActions({
	loadMore: function(event){
		var page = this.page + 1;

		this.page = page,
		this.list = this.courses.slice(0, this.page * 3)
	},
	addFavourite: function(id){
		this.favourites_map[id] = true;
		this.favourites_list.push(this.courses_map[id])
	},
	removeFavourite: function(id){
		this.favourites_map[id] = false;
		let index = this.favourites_list.findIndex((c)=>c.id === id)
		if(index !== -1)
		this.favourites_list.splice(index,1)
	},
})


const App = React.createClass({

	getInitialState: function(){
		return this.props.store.state;
	},

	componentDidMount: function(){
		AppState.addListener((state) => {
			this.setState({
				page: state.page,
				list: state.list,
				favourites_list: state.favourites_list
			})
		})
	},

	render: function(){
		return (
		  <div>
		    <div className="container">
		      <div className="row">
		        <div className="col-xs-12">
					{/* <ShoppingCartList list={cart_list} /> */}
					<FavouritesCoursesList list={this.state.favourites_list} />
					<CoursesList list={this.state.list} />
		        </div>
		      </div>
		      <div className="row">
		        <div className="col-xs-12">
		          <hr />
		          <button className="btn btn-default btn-block" onClick={actions.loadMore}> Pokaż więcej ... </button>
		        </div>
		      </div>
		    </div>
		    <footer className="footer">
		      <div className="container">
		        <p> </p>
		      </div>
		    </footer>
		  </div>
		)
	}
})


ReactDOM.render(<App store={AppState} />, document.getElementById('root'));

