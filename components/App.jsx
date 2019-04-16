

const CourseCategoriesEditor = React.createClass({

	getInitialState: function(){
		return {
			categories: this.props.categories
		}
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({
			categories: nextProps.categories
		})
	},

    changedCategories: function(e, value){
		this.addToCategory(value)
    	$(this.refs.typeahead).typeahead('val','');
    },

    addToCategory: function(category){
    	let categories = this.state.categories;
    	
    	if(categories.indexOf(category) !== -1 ){
    		return
    	}

    	this.setState({
    		categories: [...categories, category]
    	},()=>{
    		this.props.onChange(this.state.categories)
    	})
    },

    removeFromCategory: function(category){
    	let categories = [].concat(this.state.categories);
		let index = categories.indexOf(category)
    	
    	if( index === -1){
    		return
    	}
    	categories.splice(index,1);

    	this.setState({
    		categories: categories
    	},()=>{
    		this.props.onChange(this.state.categories)
    	})	
    },

    keyupCategories: function(e){
		let value = $(this.refs.typeahead).typeahead('val');
    	
    	if(value && e.keyCode == 13){
    		this.addToCategory(value)
	    	categories.add(value)
    		$(this.refs.typeahead).typeahead('val','');
    	}
    },

	componentDidMount: function(){
		console.log(this.refs);	

	    $(this.refs.typeahead).typeahead({
	      hint:true, highlight:true, minLength:1
	    },{
	      name:'categories',
	      source: this.props.source
	    })

	    $(this.refs.typeahead).on('typeahead:select', this.changedCategories );
	    $(this.refs.typeahead).on('keyup', this.keyupCategories );
	},

	componentWillUnmount: function(){
	    $(this.refs.typeahead).typeahead('destroy');
	},

	render: function(){
		return 	<div>
			<ul className="nav">
				{this.state.categories.map((cat)=>
					<li key={cat}>
						<span className="btn btn-xs" onClick={()=>this.removeFromCategory(cat)}>&times;</span> 
						<span> {cat} </span>
					</li>
				)}
			</ul>
			<br/>
			<div className="form-group">
				<input type="text" className="form-control" ref="typeahead" />
				<button className="btn btn-default" type="button"onClick={this.addToCategory}>Dodaj</button>
			</div>
		</div>
	}
})


const App = React.createClass({

	getInitialState: function(){
		return this.props.store.state;
	},

	componentDidMount: function(){
		this.props.store.addListener((state) => {
			this.setState({
				page: state.page,
				courses_list: state.courses_list,
				favourites_list: state.favourites_list,
				activeTab: state.activeTab
			})
		})
	},

	render: function(){
		return (
		  <div>
		    <div className="container">
		      <Nav onChange={actions.navigateTo} activeTab={this.state.activeTab} ></Nav>
		      <div className="row">
		        <div className="col-xs-12">
		        </div>
		      </div>
		      <div className="row">
		        <div className="col-xs-12">
		        	<Tabs activeTab={this.state.activeTab}>
						<TabPanel name="Wyszukiwarka">
							<CoursesEditor courses={this.state.courses_source}></CoursesEditor>
						</TabPanel>
						<TabPanel name="Koszyk">
							<ShoppingCartList list={this.state.cart_list} /> 
						</TabPanel>
						<TabPanel name="Ulubione">
							<FavouritesCoursesList list={this.state.favourites_list} />
						</TabPanel>
						<TabPanel name="Kursy">
							<CoursesList list={this.state.courses_list} />
		          			<hr />
		          			<button className="btn btn-default btn-block" onClick={this.props.actions.loadMore}> Pokaż więcej ... </button>
						</TabPanel>
		        	</Tabs>
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
