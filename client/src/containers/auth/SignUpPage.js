import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SignUpForm from '../../components/auth/SignUpForm';
import * as AuthActions from '../../actions/AuthActions';

const style = {
  marginLeft: 550,
  marginTop: 70,
  border: 2
};

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {
        email: '',
        username: '',
        password: ''
      },
      user: {
        email: '',
        username: '',
        password: ''
      }
    };
  }

  changeUser = (event) => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }

  submitUser = (event) => {
    event.preventDefault();
    const {actions, history} = this.props;

    actions.registerUser(this.state.user)
      .then(res => {
        if (res && res.message) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userDetails', res.userDetails.id);
          history.push('/docs');
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  render() {
    return (
      <div style={style}>
        <SignUpForm
          onSubmit={this.submitUser}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
        />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  if (state.users.length > 0) {
    return {
      user: state.users
    };
  }
  return {
    user: []
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
