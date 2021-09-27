import { parseRequestUrl } from '../utils.js';
import { getProduct } from '../api.js';
import { getCartItems } from '../localStorage.js';
import { setCartItems } from '../localStorage.js';
import { rerender } from '../utils.js';

const addToCart = (item, forceUpdate = false) => {
	let cartItems = getCartItems();
	const existItem = cartItems.find((x) => x.product === item.product);
	if (existItem) {
		if (forceUpdate) {
			cartItems = cartItems.map((x) =>
				x.product === existItem.product ? item : x
			);
		}
	} else {
		cartItems = [...cartItems, item];
	}
	setCartItems(cartItems);
	if (forceUpdate) {
		rerender(CartScreen);
	}
};

const removeFromCart = (id) => {
	setCartItems(getCartItems().filter((x) => x.product !== id));
	if (id === parseRequestUrl().id) {
		document.location.hash = '/cart';
	} else {
		rerender(CartScreen);
	}
};

const CartScreen = {
	after_render: () => {
		const qSelects = document.getElementsByClassName("quantity-select");
		Array.from(qSelects).forEach(qSelect => {
			qSelect.addEventListener('change', (event) => {
				const item = getCartItems().find(x => x.product === qSelect.id);
				addToCart({ ...item, qty: Number(event.target.value) }, true);
			});
		});

		const deleteButtons = document.getElementsByClassName("delete-button");
		Array.from(deleteButtons).forEach(deleteButton => {
			deleteButton.addEventListener('click', () => {
				removeFromCart(deleteButton.id);
			});
		});

		document.getElementById("checkout-button").addEventListener("click", () => {
			document.location.hash = "/signin";
		});
	},
	render: async () => {
		const request = parseRequestUrl();
		const auxSizes = ["XS", "S", "M", "L", "XL", "XXL"];

		if (request.id) {
			const product = await getProduct(request.id);

			addToCart({
				product: product._id,
				name: product.name,
				image: product.image,
				price: product.price,
				countInStock: product.countInStock,
				sizes: product.sizes,
				size: "XS",
				qty: 1,
			})
		}

		const cartItems = getCartItems();

		return `
		<div class="content cart">
			 <div class="cart-list">
			 	<ul class="cart-list-container">
					<li>
						<h3>Shopping Cart</h3>
						<div>Price</div>
					</li>
					${cartItems.legth === 0
				? `<div>Cart is empty. <a href="/#/">Go Shopping</a></div>`
				: cartItems.map((item) => `
						<li>
							<div class="cart-image">
								<img src="${item.image}" alt="${item.name}">
							</div>
							<div class="cart-name">
								<div>
									<a href="/#/product/${item.product}">
										${item.name}
									</a>
								</div>
								<div>
									Quantity: <select class="quantity-select" id="${item.product}">
										${[...Array(item.countInStock).keys()].map(
											(x) => item.qty === x + 1
												? `<option selected value="${x + 1}">${x + 1}</option>`
												: `<option value="${x + 1}">${x + 1}</option>`
										)}
									</select>
									<button type="button" class="delete-button" id="${item.product}">
										Delete
									</button>
								</div>
							</div>
							<div class="cart-price">
								${item.price} €
							</div>
						</li>
							`)
					.join('\n')
			}
				</ul>
			</div>
			<div class="cart-action">
				<h3>
					Subtotal (${cartItems.reduce((acc, current) => acc + current.qty, 0)} items)
					:
					${cartItems.reduce((acc, current) => acc + current.price * current.qty, 0)} €
				</h3>
				<button id="checkout-button" class="primary fw">
				Proceed to Checkout
				</button>
			</div>
		</div>
		`;
	}
}

export default CartScreen;