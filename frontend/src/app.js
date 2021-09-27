import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import { parseRequestUrl } from './utils.js';
import Error404Screen from './screens/Error404Screen.js';
import CartScreen from './screens/CartScreen.js';
import SigninScreen from './screens/SigninScreen.js';
import Header from './components/Header.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import Aside from './components/Aside.js';
import DashboardScreen from './screens/DashboardScreen.js';
import ProductListScreen from './screens/ProductListScreen.js';
import ProductEditScreen from './screens/ProductEditScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import DressScreen from './screens/DressScreen.js';
import PantScreen from './screens/PantScreen.js';
import TshirtScreen from './screens/TshirtScreen.js';
import HuddyScreen from './screens/HuddyScreen.js';
import SkirtScreen from './screens/SkirtScreen.js';
import UsersScreen from './screens/UsersScreen.js';

const routes = {
	"/": HomeScreen,
	"/product/:id": ProductScreen,
	"/cart/:id": CartScreen,
	"/cart": CartScreen,
	"/signin": SigninScreen,
	"/register": RegisterScreen,
	"/profile": ProfileScreen,
	"/shipping": ShippingScreen,
	"/payment": PaymentScreen,
	"/placeorder": PlaceOrderScreen,
	"/order/:id": OrderScreen,
	"/dashboard": DashboardScreen,
	"/productlist": ProductListScreen,
	"/product/:id/edit": ProductEditScreen,
	"/dress": DressScreen,
	"/pant": PantScreen,
	"/tshort": TshirtScreen,
	"/huddy": HuddyScreen,
	"/skirt": SkirtScreen,
	//"/userlist": UsersScreen,
};

const router = async () => {
	const request = parseRequestUrl();
	const parseUrl = (request.resource ? `/${request.resource}` : '/') +
		(request.id ? '/:id' : '') +
		(request.verb ? `/${request.verb}` : '');
	const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

	const header = document.getElementById("header-container");
	header.innerHTML = await Header.render();
	await Header.after_render();

	const aside = document.getElementById('aside-container');
	aside.innerHTML = await Aside.render();
	await Aside.after_render();

	const main = document.getElementById("main-container");
	main.innerHTML = await screen.render();
	if (screen.after_render) await screen.after_render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);