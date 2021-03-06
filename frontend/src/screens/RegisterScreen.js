import { register } from '../api.js';
import { getUserInfo, setUserInfo } from '../localStorage.js';
import { redirectUser, showMessage } from '../utils.js';

const RegisterScreen = {
	after_render: () => {
		document.getElementById("register-form")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			const data = await register({
                name: document.getElementById('name').value,
				email: document.getElementById('email').value,
				password: document.getElementById('password').value
			});

			if (data.error) {
				showMessage("Incorrect data");
			} else {
				setUserInfo(data);
				redirectUser();
			}
		})
	},

	render: () => {
		if (getUserInfo().name) {
			redirectUser();
		}
		return `
			<div class="form-container">
				<form id="register-form">
					<ul class="form-items">
						<li>
							<h1>Create Account</h1>
						</li>
						<li>
							<label for="name">Name</label>
							<input type="name" name="name" id="name">
						</li>
                        <li>
							<label for="email">Email</label>
							<input type="email" name="email" id="email">
						</li>
						<li>
							<label for="password">Password</label>
							<input type="password" name="password" id="password">
						</li>
						<li>
							<label for="repeat-password">Repeat password</label>
							<input type="password" name="repeat-password" id="repeat-password">
						</li>
                        <li>
							<button type="submit" class="primary">Register</button>
						</li>
						<li>
							<div>
								Already have an account?
								<a href="/#/signin">Sign-in</a>
							</div>
						</li>
					</ul>
				</form>
			</div>
		`;
	}
}

export default RegisterScreen;