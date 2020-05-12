import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActionCreators } from 'redux-devtools';
import styled from 'styled-components'
import LineGraph from './LineGraph'
import ActionsGraph from './ActionsGraph'
import CategoryGraph from './CategoryGraph'
import mapValues from 'lodash/mapValues'
import { getVisibleTodos, getCompletedTodoCount } from '../selectors'
import JSONTree from 'react-json-tree'

const { reset, jumpToState } = ActionCreators;

const Panel = styled.div`
  display: grid;
  grid-template-columns: 150px auto 250px;
  grid-template-rows: auto;
  grid-template-areas: "instructions visualizations state";
  gap: 30px;

  padding: 20px;
  font-size: 14px;
  font-weight: normal;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`

const GraphLabel = styled.div`
  margin-right: 10px;
  display: inline-block;
  width: 100px;
  text-align: right;
  vertical-align: top;
  padding-top: 9px;
  font-size: 12px;
  color: #5d7395;
`

const GraphColumn = styled.div`
  display: inline-block;
  width: 430px;
`

const Instructions = styled.div`
  grid-area: instructions;
`

const Visualizations = styled.div`
  grid-area: visualizations;
`

const State = styled.div`
  grid-area: state;
`

const PanelColumnLabel = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  color: #aaa;
  font-size: 12px;
`

function reducer() {
  return {};
}

// Todo: switch to functional component
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
    // start with no state selected (ie, we track current state)
    selectedStateId: null
  };

  render() {
    const {
      currentStateIndex, computedStates, actionsById, stagedActionIds, skippedActionIds, dispatch, stagedActions
    } = this.props;

    // if the selected state is the most recent state,
    // we increment it to match the current state.
    // this way, by default, the selected state follows the
    // current state, but if the user selects a past state,
    // it doesn't follow current state.

    const currentState = computedStates[currentStateIndex].state

    const todosLength = computedStates.map((state, index) => ({
      stateId: index,
      value: state.state.todos.length
    }))

    const visibleTodosLength = computedStates.map((state, index) => ({
      stateId: index,
      value: getVisibleTodos(state.state).length
    }))

    const completedTodosCount = computedStates.map((state, index) => ({
      stateId: index,
      value: getCompletedTodoCount(state.state)
    }))

    const visibilityFilter = computedStates.map((state, index) => ({
      stateId: index,
      value: state.state.visibilityFilter
    }))

    const actionsForGraph = stagedActionIds.map(id => ({
      stateId: id,
      value: actionsById[id].action.type
    }))

    const resetToSelectedState = () => {
      let stateIndexToJump;
      // if no state is selected, jump to most recent state
      if (this.state.selectedStateId === null) {
        stateIndexToJump = computedStates.length - 1;
      } else {
        stateIndexToJump = this.state.selectedStateId;
      }

      dispatch(jumpToState(stateIndexToJump));
    }

    const setSelectedStateId = (stateId) => {
      if (stateId !== computedStates.length - 1) {
        this.setState({ selectedStateId: stateId })
      } else {
        this.setState({ selectedStateId: null })
      }
    }

    const graphWidth = 300;
    const graphHeight = 35;
    const paddingRight = 50;

    return (
      <Panel>
        <Instructions>
          <h3 style={{marginTop: 0}}>MVU Visualizer</h3>

          <p>Geoffrey Litt, 6.894 Final Project</p>

          <p>
            <a href="https://github.mit.edu/6894-sp20/FP-Program-Execution-Visualization/">project background / description</a>
          </p>

         <p>
           Try it out: 1) do some things in the app, 2) hover on graphs below to navigate past states, 3) click in a graph to rewind the app state to a past version.
         </p>

        </Instructions>

        <Visualizations>
          <PanelColumnLabel>Timeline</PanelColumnLabel>

            <div>
              <GraphLabel>actions</GraphLabel>

              <ActionsGraph
                data={actionsForGraph}
                currentStateId={currentStateIndex}
                width={graphWidth}
                height={graphHeight}
                setSelectedStateId={setSelectedStateId}
                jumpToState={(stateId) => dispatch(jumpToState(stateId))}
                resetToSelectedState={resetToSelectedState}
                paddingRight={paddingRight} />
            </div>

            <div>
              <GraphLabel># todos</GraphLabel>

              {/* todo: could dynamically define the state -> value function? */}
              <LineGraph
                data={todosLength}
                currentStateId={currentStateIndex}
                width={graphWidth}
                height={graphHeight}
                setSelectedStateId={setSelectedStateId}
                jumpToState={(stateId) => dispatch(jumpToState(stateId))}
                resetToSelectedState={resetToSelectedState}
                paddingRight={paddingRight}
                />
            </div>

            <div>
              <GraphLabel># visible</GraphLabel>

              {/* todo: could dynamically define the state -> value function? */}
              <LineGraph
                data={visibleTodosLength}
                currentStateId={currentStateIndex}
                width={graphWidth}
                height={graphHeight}
                setSelectedStateId={setSelectedStateId}
                jumpToState={(stateId) => dispatch(jumpToState(stateId))}
                resetToSelectedState={resetToSelectedState}
                paddingRight={paddingRight}
                />
            </div>

            <div>
              <GraphLabel># completed</GraphLabel>

              {/* todo: could dynamically define the state -> value function? */}
              <LineGraph
                data={completedTodosCount}
                currentStateId={currentStateIndex}
                width={graphWidth}
                height={graphHeight}
                setSelectedStateId={setSelectedStateId}
                jumpToState={(stateId) => dispatch(jumpToState(stateId))}
                resetToSelectedState={resetToSelectedState}
                paddingRight={paddingRight}
                />
            </div>

            <div>
              <GraphLabel>visibilityFilter</GraphLabel>

              {/* todo: could dynamically define the state -> value function? */}
              <CategoryGraph
                data={visibilityFilter}
                currentStateId={currentStateIndex}
                width={graphWidth}
                height={graphHeight}
                setSelectedStateId={setSelectedStateId}
                jumpToState={(stateId) => dispatch(jumpToState(stateId))}
                resetToSelectedState={resetToSelectedState}
                paddingRight={paddingRight}
                />
            </div>
          </Visualizations>

          <State>
            <PanelColumnLabel>App state</PanelColumnLabel>
            <JSONTree data={currentState} theme="monokai" />
          </State>
      </Panel>
    );
  }
}
