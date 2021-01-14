import React from 'react';
import { userService } from '../services/user.service';
export default class LoginForm extends React.Component {
    constructor(props){
        super();
        this.state = {
            email: '',
            password: '',

        }
    }
    onChangeHandler = (evt) => {
        const value = evt.target.value;
        this.setState({ [evt.target.name]: value});
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const data = {
            'email': this.state.email,
            'password': this.state.password
        }
        let x = userService.login(data)
        .then(resolve => {
            console.log('userService response:', x);
        })
        .catch(reject => {
            console.log('login failed with:', reject.message);
        })

    }
    render() {
        
        return(
            <div>
                <form autoComplete="off" name="login" onSubmit={this.handleSubmit}>
                    <label>
                        <div>Email</div>
                        <input type="text" name="email" onChange={this.onChangeHandler}/>
                    </label>
                    <label>
                        <div>Password</div>
                        <input type="password" name="password" onChange={this.onChangeHandler}/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
