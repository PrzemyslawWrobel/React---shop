const CoursesSearch = React.createClass({

	getInitialState: function(){
		return {
			'query': '',
			'filtered_list':[]
		}
	},

	filterList: function(event){

		event.persist();

		clearTimeout(this.pending);

		this.pending = setTimeout(()=>{
			let query = event.target.value;

			this.setState({
				filtered_list: this.props.courses.filter((course) => (
					query.length >= 3 &&
					(  course.title.toLowerCase().includes(query.toLowerCase()) 
					|| course.description.toLowerCase().includes(query.toLowerCase())
					|| course.author.toLowerCase().includes(query.toLowerCase())
					)
				))
			})
		},500)

	},

	render: function(){
		return <div>
			<input type="text" className="form-control" onChange={this.filterList} placeholder="Filtruj listę kursów" />
			<hr/>
			<div className="list-group">
				{this.state.filtered_list.map((course)=>(
					<a href="#" key={course.id} className={"list-group-item " + (this.props.selected === course? "active":"")}
					   onClick={()=>this.props.onSelect(course)}>
						<h4 className="list-group-item-heading"> {course.title} </h4>
						<p className="list-group-item-text"> {course.author} </p>
					</a>
				))}
			</div>
		</div>
	}
})

const CoursesEditor = React.createClass({

	getInitialState: function(){
		return {
			selected: null
		}
	},

	select: function(course){
		this.setState({
			selected: course
		})
	},


	render: function(){
		return <div>
			<div className={this.state.selected? "col-xs-4" :  "col-xs-12"}>
				<h1> Edytor Kursów </h1>
				<hr/>
				<CoursesSearch courses={this.props.courses} onSelect={this.select} selected={this.state.selected}></CoursesSearch>
			</div>
			{this.state.selected? <div className="col-xs-8">
			  	<CourseForm course={this.state.selected}
			  	onCancel={()=>this.select(null)}
				onSave={(course)=>actions.saveCourse(course)}></CourseForm>
			</div> : null}
		</div>
	}
})

const CourseForm = React.createClass({

	getInitialState: function(){
		return {
			course: {...this.props.course}
		}
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({
			course: {...nextProps.course}
		})
	},

	changedTitle: function(e){
		this.setState({
			course: {...this.state.course, title: e.target.value}
		})
	},

	changedDescription: function(e){
		this.setState({
			course: {...this.state.course, description: e.target.value}
		})
	},

	changedAuthor: function(e){
		this.setState({
			course: {...this.state.course, author: e.target.value}
		})
	},

	changedIsPromo: function(e){
		console.log(e.target.value)
		this.setState({
			course: {...this.state.course, is_promo: !this.state.course.is_promo }
		})
	},

	changedIsNew: function(e){
		console.log(e.target.value)
		this.setState({
			course: {...this.state.course, is_new: !this.state.course.is_new  }
		})
	},


	onSave: function(event){
		event.preventDefault();

		this.props.onSave(this.state.course)
	},

	render: function(){
		return <div>
			<form onSubmit={this.onSave}>
				<div className="form-group">
					<label className="control-label">Nazwa Kursu:</label>
					<div>
						<input type="text" className="form-control" value={this.state.course.title} onChange={this.changedTitle}/>
					</div>
				</div>
				<div className="form-group">
					<label className="control-label">Opis Kursu:</label>
					<div>
						<textarea rows="10" type="text" className="form-control" value={this.state.course.description} 
						onChange={this.changedDescription}></textarea>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-6">
						<div className="form-group">
							<label className="control-label">Opcje:</label>
						</div>
						<div className="form-group">
								<label className="control-label col-xs-6">
									<input type="checkbox" checked={this.state.course.is_promo || ''} onChange={this.changedIsPromo} /> W promocji
								</label>


								<label className="control-label col-xs-6">
									<input type="checkbox" checked={this.state.course.is_new || ''} onChange={this.changedIsNew} /> Nowość 
								</label>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="form-group">
							<label className="control-label">Autor:</label>
							<div>
								<select className="form-control" value={this.state.course.author} onChange={this.changedAuthor}>
									{Object.keys(AppState.state.authors_map).map(author=>
									 	<option key={author} value={author}>{author}</option>
									)}
								</select>
							</div>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="btn-group pull-right">
						<input type="button" className="btn btn-danger" value="Anuluj" onClick={this.props.onCancel} />
						<input type="submit" className="btn btn-success" value="Zapisz" />
					</div>
				</div>
			</form>
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
