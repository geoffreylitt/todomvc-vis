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
    selectedStateId: this.props.currentStateIndex
  };

  setSelectedStateId = (stateId) => this.setState({ selectedStateId: stateId })

  render() {
    const {
      currentStateIndex, computedStates, actionsById, stagedActionIds, skippedActionIds, dispatch, stagedActions
    } = this.props;

    const selectedState = computedStates[this.state.selectedStateId].state

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


    const graphWidth = 300;
    const graphHeight = 35;

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
                setSelectedStateId={this.setSelectedStateId}
                selectedStateId={this.state.selectedStateId}
                jumpToState={(stateId) => dispatch(jumpToState(stateId))} />
            </div>

            <div>
              <GraphLabel># todos</GraphLabel>

              {/* todo: could dynamically define the state -> value function? */}
              <LineGraph
                data={todosLength}
                currentStateId={currentStateIndex}
                width={graphWidth}
                height={graphHeight}
                setSelectedStateId={this.setSelectedStateId}
                selectedStateId={this.state.selectedStateId}
                jumpToState={(stateId) => dispatch(jumpToState(stateId))}
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
                setSelectedStateId={this.setSelectedStateId}
                selectedStateId={this.state.selectedStateId}
                jumpToState={(stateId) => dispatch(jumpToState(stateId))}
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
                setSelectedStateId={this.setSelectedStateId}
                selectedStateId={this.state.selectedStateId}
                jumpToState={(stateId) => dispatch(jumpToState(stateId))}
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
                setSelectedStateId={this.setSelectedStateId}
                selectedStateId={this.state.selectedStateId}
                jumpToState={(stateId) => dispatch(jumpToState(stateId))}
                />
            </div>
          </Visualizations>

          <State>
            <PanelColumnLabel>App state</PanelColumnLabel>
            <JSONTree data={selectedState} theme="monokai" />
          </State>
      </Panel>
    );
  }
}
