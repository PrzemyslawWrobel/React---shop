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

	changedCategories: function(categories){
		this.setState({
			course: {...this.state.course, categories: categories}
		})
	},

	onSave: function(event){
		event.preventDefault();

		this.props.onSave(this.state.course)
	},


	render: function(){
		return <div>
			<h3> Edycja Kursu </h3>
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
					<label className="control-label">Kategorie:</label>
					<div className="form-group">
						<CourseCategoriesEditor 
							onChange={this.changedCategories} 
							source={categories} 
							categories={this.state.course.categories}>
						</CourseCategoriesEditor>
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