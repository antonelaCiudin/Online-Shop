import Rating from '../components/Rating.js';
import { getProducts } from '../api.js';

const HomeScreen = {
	after_render: () => {},
    render: async () => {
		const products = await getProducts();
		if (products.error) {
			return `<div class="error">${products.error}</div>`;
		}

		// const products = await response.data;

    	return `
			<ul class="products">
				${products.map (
					(product) => `
				<li>
					<div class="product">
						<a href="/#/product/${product._id}">
							<img src="${product.image}" alt="${product.name}">
						</a>
						<div class="product_name">
							<a href="/#/product/1">
								${product.name}
							</a>
						</div>
						<div class="product-rating">
							${Rating.render({
								value: product.rating, 
								text: `${product.numReviews} reviews`
							})}
						</div>
						<div class="product_brand">
							${product.brand}
						</div>
						<div class="product_price">
							${product.price} €
						</div>
					</div>
				</li>
				`
				).join('\n') }
			</ul>
		`;
    },
};

export default HomeScreen;