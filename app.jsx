
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
					<StateButton active={AppState.state.favourites.indexOf(data.id) !== -1} 
						onStateChange={(state)=>{
						state? actions.addFavourite(data.id) : actions.removeFavourite(data.id)
					}} />
				</div>
			</Course>)}
		</div>
	    <hr />
	    <button className="btn btn-default btn-block" onClick={actions.loadMore}> Pokaż więcej ... </button>
	</div>
)

const FavouriteCoursesList = ({list}) => (
	<div>
		<h1> Ulubione Kursy </h1>
		<hr />
		<div>
			{list.map((data) => <Course data={data} key={data.id} Details={CourseDetails}>
		  		{/* Course Actions */}
				<div className="btn-group pull-right">
					<Button label="Szczególy kursu" />
					<Button label="Usuń z ulubionych" icon="remove" 
						onClick={()=>actions.removeFavourite(data.id)} />
				</div>
			</Course>)}
			{list.length? null : <p className="text-center">Brak ulubionych kursów na liście</p>}
		</div>
	</div>
)

const StateButton = React.createClass({

	getInitialState: function(){
		return {
			active: this.props.active
		}
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({
			active: nextProps.active
		})
	},

	getDefaultProps: function(){
		return {
			active: false,
			onStateChange: function(){}
		}
	},

	setActive: function(){
		this.setState({
			active: true
		},()=>{
			this.props.onStateChange(this.state.active)
		})
	},

	setInactive: function(){
		this.setState({
			active: false
		},()=>{
			this.props.onStateChange(this.state.active)
		})
	},

	render: function(){
		return (this.state.active?
			<Button label="Usuń z ulubionych" icon="star" onClick={this.setInactive} /> :
			<Button label="Dodaj do ulubionych" icon="star-empty" onClick={this.setActive} />
		)
	}

})


const ShoppingCartList = ({list}) =>(
	<div>
		<h1> Koszyk </h1>
		<hr />
		<div>
			{list.map((data) => <Course data={data} key={data.id} Details={CartDetails}>
				<div className="btn-group pull-right">
					<Button label="Szczegóły kursu" />
					<Button label="Przenieś do ulubionych" icon="star"/>
				</div>
				<div><b>Autor: </b> {data.author} <br/> <b>Czas trwania: </b> {data.duration} </div>
			</Course>)}
		</div>
	</div>
)

function StateStore(){
	this.state = {}

	this.listeners =[];

	this.addListener = function(callback){
		this.listeners.push(callback)
	}

	this.createAction = function(name, callback){
		var self = this;

		return function(){
			callback.apply(self, arguments);
			self.dispatchEvents()
		}
	}

	this.createActions = function(handlersObj){
		let actions = {};
		for(name in handlersObj){
			actions[name] = this.createAction(name, handlersObj[name])
		}
		return actions;
	}

	this.dispatchEvents = function(){
		for(let listener of this.listeners){
			listener(this.state)
		}
	}
}
const AppState = new StateStore();
AppState.state = {
	list: [],
	page: 1,
	courses: [],

	favourites:[],
	favourite_list: []
}

const actions = AppState.createActions({
	addFavourite: function(id){
		let fav = this.state.favourites,
		index = fav.indexOf(id);

		// add only if not exists
		if(index === -1)
		this.state.favourites.push(id)
	},
	removeFavourite: function(id){
		let fav = this.state.favourites,
		index = fav.indexOf(id);
		
		// remove only if exists
		if(index !== -1)
		this.state.favourites.splice(index,1) 
	},
	loadMore: function(){
		this.state.page++;
	},
	load: function(courses){
		this.state.courses = courses;
	}
})

// Derive list form page and original data
AppState.addListener(function(state){
	if(state.list.length !== state.page *3){
		state.list = state.courses.slice(0, state.page * 3);
	}
	if(state.favourites.length !== state.favourite_list.length){
		state.favourite_list = state.courses.filter((course) => state.favourites.indexOf(course.id) !== -1)
	}
})

// Load original data
actions.load(courses_data);

const App = React.createClass({

	getInitialState: function(){
		return this.props.store.state
	},

	componentDidMount : function(){
		this.props.store.addListener((state)=>this.setState(state))
	},

	render: function(){
		return (
		  <div>
		    <div className="container">
		      <div className="row">
		        <div className="col-xs-12">
					{/* <ShoppingCartList list={cart_list} /> */}
					<FavouriteCoursesList list={this.state.favourite_list} />
					<CoursesList list={this.state.list} />
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


ReactDOM.render(<App store={AppState} loadMore={actions.loadMore} />, document.getElementById('root'));

