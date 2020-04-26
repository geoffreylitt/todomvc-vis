import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as themes from 'redux-devtools-themes';
import { ActionCreators } from 'redux-devtools';
import styled from 'styled-components'

const { reset, jumpToState } = ActionCreators;

const Panel = styled.div`
  padding: 20px;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`

function reducer() {
  return {};
}

export default class VisMonitor extends (PureComponent || Component) {
  static update = reducer;

  static propTypes = {
    dispatch: PropTypes.func,
    computedStates: PropTypes.array,
    stagedActionIds: PropTypes.array,
    actionsById: PropTypes.object,
    currentStateIndex: PropTypes.number,
    monitorState: PropTypes.shape({
      initialScrollTop: PropTypes.number
    }),
    preserveScrollTop: PropTypes.bool,
    stagedActions: PropTypes.array,
    select: PropTypes.func.isRequired,
    hideResetButton: PropTypes.bool,
  };

  static defaultProps = {
    select: state => state,
  };

  state = {
    timer: undefined,
    replaySpeed: '1x'
  };



  render() {
    const {
      currentStateIndex, computedStates, actionsById, stagedActionIds, hideResetButton
    } = this.props;

    return (
      <Panel>
        <h3>6.894 A4 Prototype</h3>
        <div>
          current state index: {currentStateIndex}
        </div>

        <div>
          computed states: {JSON.stringify(computedStates)}
        </div>

        <div>
          actions by ID: {JSON.stringify(actionsById)}
        </div>
      </Panel>
    );
  }
}
