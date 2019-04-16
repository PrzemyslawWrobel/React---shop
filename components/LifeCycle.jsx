const LifeCycle = React.createClass({

	getDefaultProps: function(){
		console.log('getDefaultProps',arguments, this.props);	
		return { 
			name: ''
		}
	},

	getInitialState: function(){
		console.log('getInitialState',arguments, this.props);	
		return { 
			name: ''
		}
	},

	componentWillMount: function(){
		console.log('componentWillMount',arguments);			
	},

	render: function(){
		console.log('render',arguments);	

		return <div></div>
	},

	componentDidMount: function(){
		console.log('componentDidMount',arguments);			
	},

	componentWillReceiveProps:function(nextProps){
		console.log('componentWillReceiveProps',arguments,nextProps,this.props);	
	},

	shouldComponentUpdate: function(nextProps, nextState){
		console.log('shouldComponentUpdate',arguments);	
		return true;	
	},

	componentWillUpdate: function(nextProps, nextState){
		console.log('componentWillUpdate',arguments);	
	},

	componentDidUpdate: function(prevProps,prevState){
		console.log('componentDidUpdate',arguments);
	},

	componentWillUnmount: function(){
		console.log('componentWillUnmount',arguments);	
	}

})
