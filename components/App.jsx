const Tabs = (props) => {
	let tabs = React.Children.toArray(props.children)

	return <div>{tabs.filter(tab => props.activeTab === tab.props.name )}</div>
}
const TabPanel = (props) => {
	return <div>{props.children}</div>
}

const TabsNav = (props) => {
	let tabs = React.Children.toArray(props.children)

	return <ul className="nav nav-tabs">
		{tabs.map(tab => <li 
			key={tab.props.name}
			className={props.activeTab === tab.props.name? 'active' : ''}
			onClick={(e)=>props.onChange(tab.props.name,e)}
		>
			<a href="#">{tab.props.name}</a>
		</li> )}
	</ul>
}
const Tab = (props) => {
	return props.children
}

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
		      <div className="row">
		        <div className="col-xs-12">
		        	<TabsNav onChange={actions.navigateTo} activeTab={this.state.activeTab}>
		        		<Tab name="Kursy"></Tab>
		        		<Tab name="Ulubione"></Tab>
		        		<Tab name="Koszyk"></Tab>
		        	</TabsNav>
		        </div>
		      </div>
		      <div className="row">
		        <div className="col-xs-12">

		        	<Tabs activeTab={this.state.activeTab}>
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
