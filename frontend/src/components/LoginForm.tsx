import React, { ChangeEventHandler, FormEventHandler } from "react";

type MyProps = {
    // using `interface` is also ok
    message: string;
  };

class LoginForm extends React.Component<MyProps> {
    state = {
        username: "",
        password: ""
    }

    onUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({username: e.currentTarget.value})
    }

    onPasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({password: e.currentTarget.value})
    }

    handleSubmit:FormEventHandler = (event) => {
        fetch(`http://localhost:8000/${this.props.message}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>{this.props.message}</p>
                <label>
                    username:
                    <input type="text" name="username" id="username" value={this.state.username} onChange={this.onUsernameChange}/>
                </label>
                <br></br>
                <label>
                    password:
                    <input type="password" name="password" id="password" value={this.state.password} onChange={this.onPasswordChange}/>
                </label><br></br>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default LoginForm;