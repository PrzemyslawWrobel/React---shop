const CartButton = ({in_cart, className = "btn btn-block", icon, label}) => {
	return (in_cart? 
		<Button className={className + " btn-danger"} icon={icon || "remove"} label={label || "Usuń z koszyka"} /> :
		<Button className={className + " btn-success"} icon={icon || "shopping-cart"} label={label || "Dodaj do koszyka"} />
	)
}

const CartDetails = (props) => (
	<div className="course_details text-center">
		<h1 className="thumbnail">{props.data.price} PLN</h1>
		<CartButton in_cart={true} />
	</div>
)