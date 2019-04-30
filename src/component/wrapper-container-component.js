/* This component handles errors and loading screen */
import React from 'react';
import {
  Container, Content, Header,
  Spinner, Text, Toast,
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { errorAction } from '../actions/applicaiton-state-actions';


class WrapperContainer extends React.Component {
  componentWillUpdate(nextProps) {
    if (nextProps.errorString !== '') this.showDangerToast(nextProps.errorString);
  }

  showDangerToast = (message) => {
    Toast.show({
      text: message,
      buttonText: 'Okay',
      type: 'danger',
      duration: 10000,
      onClose: () => { this.props.errorAction(''); },
    });
  };

  render() {
    if (this.props.loading) {
      return (
        <Container>
          <Header transparent />
          <Content>
            <Spinner color="blue" />
            <Text style={{ textAlign: 'center' }}>
              {' '}
              {this.props.loadingText}
              {' '}
            </Text>
          </Content>
        </Container>
      );
    }


    return (
      <Container {...this.props}>
        {this.props.children}
      </Container>
    );
  }
}

export default connect(
  state => ({
    loading: state.application.loadingState,
    errorString: state.application.errorString,
  }),
  dispatch => bindActionCreators({ errorAction }, dispatch),
)(WrapperContainer);
