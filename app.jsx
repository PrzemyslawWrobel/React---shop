
var AppState = new StateStore();

AppState.setState({
	page: 1,
	courses_source: courses_data,

	courses_map: courses_data.reduce((map, course) => {
		map[course.id] = course;
		return map;
	},{}),
	courses_list: courses_data.slice(0,3),

	favourites_list: [],
	favourites_map: {}
})

const Rating = React.createClass({

	getDefaultProps: function(){
		return {
			max: 5,
			value: 0,
			onChange: function(){}
		}
	},

	componentWillReceiveProps: function(nextProps){
		if(this.state.rating != nextProps.value){
			this.setRating(nextProps.value)
		}
	},

	getInitialState: function(){
		return {
			indicator: this._makeIndicator(this.props.value, this.props.max),
			rating: this.props.value,
		}
	},

	onMouseEnter: function(i){
		return () => this.setIndicator(i);
	},

	onMouseLeave: function(i){
		return () => this.setIndicator(this.state.rating);
	},

	onClick: function(i){
		return () => this.setRating(i);
	},

	setRating: function(rating){
		this.setState({
			rating: rating
		});
		this.setIndicator(rating);
		this.props.onChange(rating);
	},

	setIndicator: function(rating){
		this.setState({
			indicator: this._makeIndicator(rating, this.props.max)
		})
	},

	_makeIndicator: function(rating, max){
		return [ ...Array(rating).fill(true), ...Array(max-rating).fill(false) ]
	},

	render: function(){
		return <div>
			{this.state.indicator.map((item, i) => (<span key={i} 
				className={"glyphicon " + (item? "glyphicon-star" : "glyphicon-star-empty")}
				onMouseEnter={this.onMouseEnter(i+1)} 
				onMouseLeave={this.onMouseLeave(i+1)}
				onClick={this.onClick(i+1)}></span>)) }
		</div>
	}
})

const actions = AppState.createActions({
	loadMore: function(event){
		var page = this.page + 1;

		this.page = page,
		this.courses_list = this.courses_source.slice(0, this.page * 3)
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


ReactDOM.render(<App store={AppState} actions={actions} />, document.getElementById('root'));

