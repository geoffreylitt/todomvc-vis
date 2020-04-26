import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActionCreators } from 'redux-devtools';
import styled from 'styled-components'
import ActionList from './ActionList'

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
  };

  static defaultProps = {
    select: state => state,
  };

  state = {
    hoveredStateId: this.props.currentStateIndex
  };

  setHoveredStateId = (stateId) => this.setState({ hoveredStateId: stateId })

  render() {
    const {
      currentStateIndex, computedStates, actionsById, stagedActionIds, hideResetButton
    } = this.props;

    return (
      <Panel>
        <h3>6.894 A4 Prototype</h3>

        <ActionList stagedActionIds={stagedActionIds} actionsById={actionsById} setHoveredStateId={this.setHoveredStateId} />

        <hr />

        <div>
          hovered state Id: {this.state.hoveredStateId}
        </div>

        <div>
          current state index: {currentStateIndex}
        </div>

        <div>
          computed states: {JSON.stringify(computedStates)}
        </div>

        <div>
          staged Action Ids: {stagedActionIds}
        </div>
      </Panel>
    );
  }
}
