import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { AppState } from '../../../../../../modules/store';
import { ProblemSet } from '../../../../../../modules/api/jerahmeel/problemSet';
import { ProblemSetProblem } from '../../../../../../modules/api/jerahmeel/problemSetProblem';
import { selectProblemSet } from '../../../modules/problemSetSelectors';
import * as breadcrumbsActions from '../../../../../../modules/breadcrumbs/breadcrumbsActions';
import * as problemSetProblemActions from '../modules/problemSetProblemActions';

export interface SingleProblemSetProblemDataRouteProps
  extends RouteComponentProps<{ problemSetSlug: string; problemAlias: string }> {
  problemSet?: ProblemSet;

  onClearProblem: () => void;
  onGetProblem: (problemSetJid: string, problemAlias: string) => Promise<ProblemSetProblem>;
  onPushBreadcrumb: (link: string, title: string) => void;
  onPopBreadcrumb: (link: string) => void;
}

class SingleProblemSetProblemDataRoute extends React.Component<SingleProblemSetProblemDataRouteProps> {
  async componentDidMount() {
    await this.refresh();
  }

  async componentDidUpdate(prevProps: SingleProblemSetProblemDataRouteProps) {
    if ((prevProps.problemSet && prevProps.problemSet.jid) !== (this.props.problemSet && this.props.problemSet.jid)) {
      this.props.onPopBreadcrumb(this.props.match.url);
      await this.refresh();
    }
  }

  componentWillUnmount() {
    this.props.onClearProblem();
    this.props.onPopBreadcrumb(this.props.match.url);
  }

  render() {
    return null;
  }

  refresh = async () => {
    const { problemSet, match } = this.props;
    if (!problemSet || problemSet.slug !== match.params.problemSetSlug) {
      return;
    }
    await this.props.onGetProblem(problemSet.jid, match.params.problemAlias);
    this.props.onPushBreadcrumb(match.url, match.params.problemAlias);
  };
}

const mapStateToProps = (state: AppState) => ({
  problemSet: selectProblemSet(state),
});

const mapDispatchToProps = {
  onGetProblem: problemSetProblemActions.getProblem,
  onClearProblem: problemSetProblemActions.clearProblem,
  onPushBreadcrumb: breadcrumbsActions.pushBreadcrumb,
  onPopBreadcrumb: breadcrumbsActions.popBreadcrumb,
};

export default withRouter<any, any>(connect(mapStateToProps, mapDispatchToProps)(SingleProblemSetProblemDataRoute));
