import { parseRequestUrl, showMessage } from '../utils.js';
import { getProduct } from '../api.js';
import Rating from '../components/Rating.js'

const ProductScreen = {
	after_render: async () => {
		const request = parseRequestUrl();
		const product = await getProduct(request.id);

		document.getElementById("add-button")
			.addEventListener('click',
				() => {
					product.countInStock > 0 
					? document.location.hash = `/cart/${request.id}`
					: showMessage("This product is not in stock");
				}
			);
	},

	render: async () => {
		const request = parseRequestUrl();
		const product = await getProduct(request.id);

		if (product.error) {
			return `<div>${product.error}</div>`;
		}

		return `
			<div class="content">
				<div class="details">
					<div class="details-image">
						<img src="${product.image}" alt="${product.name}">
					</div>
					<div class="details-info">
						<ul>
							<li>
								<h1>${product.name}</h1>
							</li>
							<li>
								${Rating.render({
									value: product.rating,
									text: `${product.numReviews} reviews`,
								})}
							</li>
							<li>
								Price: <strong>${product.price} Lei</strong>
							</li>
							
						</ul>
					</div>
					<div class="details-action">
						<ul>
							<li>
								Price: ${product.price} Lei
							</li>
							<li>
								Status: ${product.countInStock > 0 ?
									`<span class="succes">In stock</span>`
									: `<span class="error">Unavailable</span>`
								}
							</li>
							<li>
								<button id="add-button" class="fw primary">Add to Cart </button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		`;
	},
};

export default ProductScreen;