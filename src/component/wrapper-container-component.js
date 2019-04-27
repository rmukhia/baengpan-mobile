/* This component handles errors and loading screen */
import React from 'react';
import {
  Container, Content, Header,
  Spinner, Text, Toast,
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { errorAction } from '../actions/applicaiton-state-actions';

const WrapperContainer = (props) => {
  if (props.loading) {
    return (
      <Container>
        <Header transparent />
        <Content>
          <Spinner color="blue" />
          <Text style={{ textAlign: 'center' }}>
            {' '}
            {props.loadingText}
            {' '}
          </Text>
        </Content>
      </Container>
    );
  }
  return (
    <Container {...props}>
      {props.children}
      {props.errorString !== '' ? Toast.show({
        text: props.errorString,
        buttonText: 'Okay',
        type: 'danger',
        duration: 10000,
        onClose: () => { props.errorAction(''); },
      }) : null }
    </Container>
  );
};

export default connect(
  state => ({
    loading: state.ApplicationState.loadingState,
    errorString: state.ApplicationState.errorString,
  }),
  dispatch => bindActionCreators({ errorAction }, dispatch),
)(WrapperContainer);
