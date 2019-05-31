import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import {
  getResultAsset,
  updateGlobalPollingRate,
  updateGlobalChartSize,
  updateGlobalLogsLimit,
  updateGlobalResultNameAlignment,
  updateGlobalHighlightTableAndChart,
  updateAssetsTableColumnsVisibility,
} from '../actions';
import NavigationBar from './NavigationBar';
import AssetsTable from '../components/AssetsTable';


class AssetsContainer extends React.Component {
  componentDidMount() {
    const { projectId, resultId } = this.props;
    this.props.getResultAsset(projectId, resultId);
    this.handleAssetsTableColumnsVisibilityUpdate = this.handleAssetsTableColumnsVisibilityUpdate.bind(this);
  }

  handleAssetsTableColumnsVisibilityUpdate(knownTrainInfoKeysConfig, knownContentKeysConfig) {
    const {
      projectId,
      resultId,
    } = this.props;
    this.props.updateAssetsTableColumnsVisibility(
      projectId,
      resultId,
      knownTrainInfoKeysConfig,
      knownContentKeysConfig
    );
  }

  render() {
    const {
      assets, globalConfig, fetchState, resultConfig,
    } = this.props;
    const {
      assetsTableState = {},
    } = resultConfig;
    return (
      <div className="chainerui-container">
        <NavigationBar
          fetchState={fetchState}
          globalConfig={globalConfig}
          onGlobalConfigLogsLimitUpdate={this.props.updateGlobalLogsLimit}
          onGlobalConfigPollingRateUpdate={this.props.updateGlobalPollingRate}
          onGlobalConfigChartSizeUpdate={this.props.updateGlobalChartSize}
          onGlobalConfigResultNameAlignmentUpdate={this.props.updateGlobalResultNameAlignment}
          onGlobalHighlightTableAndChartUpdate={this.props.updateGlobalHighlightTableAndChart}
        />
        <Container>
          <AssetsTable
            assets={assets}
            tableState={assetsTableState}
            onAssetsTableColumnsVisibilityUpdate={this.handleAssetsTableColumnsVisibilityUpdate}
          />
        </Container>
      </div>
    );
  }
}

AssetsContainer.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  resultId: uiPropTypes.resultId.isRequired,
  assets: uiPropTypes.assets.isRequired,
  fetchState: uiPropTypes.fetchState.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
  resultConfig: uiPropTypes.resultConfig.isRequired,
  getResultAsset: PropTypes.func.isRequired,
  updateGlobalPollingRate: PropTypes.func.isRequired,
  updateGlobalChartSize: PropTypes.func.isRequired,
  updateGlobalResultNameAlignment: PropTypes.func.isRequired,
  updateGlobalLogsLimit: PropTypes.func.isRequired,
  updateGlobalHighlightTableAndChart: PropTypes.func.isRequired,
  updateAssetsTableColumnsVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const projectId = Number(ownProps.params.projectId);
  const resultId = Number(ownProps.params.resultId);
  const {
    entities,
    fetchState,
    config,
  } = state;
  const { assets } = entities;
  const globalConfig = config.global;
  const projectConfig = config.projectsConfig[projectId] || {};
  const resultConfig = projectConfig.resultsConfig[resultId] || {};
  return {
    projectId,
    resultId,
    assets,
    fetchState,
    globalConfig,
    resultConfig,
  };
};

export default connect(mapStateToProps, {
  getResultAsset,
  updateGlobalPollingRate,
  updateGlobalChartSize,
  updateGlobalLogsLimit,
  updateGlobalResultNameAlignment,
  updateGlobalHighlightTableAndChart,
  updateAssetsTableColumnsVisibility,
})(AssetsContainer);
