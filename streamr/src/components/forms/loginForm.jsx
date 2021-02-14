import React from "react";
import { withRouter } from "react-router-dom";
import { userService } from "../../services/user.service";
import cookie from "react-cookies";
class LoginForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: "",
            password: "",
        };
    }
    onChangeHandler = (evt) => {
        const value = evt.target.value;
        this.setState({ [evt.target.name]: value });
    };

    handleSubmit = async (evt) => {
        evt.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
        };
        let x = await userService.login(data);
        console.log("x:", x.token);
        if (!x.token) return;
        await cookie.save("token", x.token, { path: "/" });
        this.props.history.push("/");
    };
    render() {
        return (
            <div>
                <form
                    autoComplete="off"
                    name="login"
                    onSubmit={this.handleSubmit}
                >
                    <label>
                        <div>Email</div>
                        <input
                            type="text"
                            name="email"
                            onChange={this.onChangeHandler}
                        />
                    </label>
                    <label>
                        <div>Password</div>
                        <input
                            type="password"
                            name="password"
                            onChange={this.onChangeHandler}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginForm);
