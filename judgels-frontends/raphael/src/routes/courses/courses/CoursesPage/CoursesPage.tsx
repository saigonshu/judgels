import * as React from 'react';
import { connect } from 'react-redux';

import { Card } from '../../../../components/Card/Card';
import { HtmlText } from '../../../../components/HtmlText/HtmlText';
import { LoadingContentCard } from '../../../../components/LoadingContentCard/LoadingContentCard';
import { UserRole } from '../../../../modules/api/jophiel/role';
import { CoursesResponse } from '../../../../modules/api/jerahmeel/course';
import { CourseCard } from '../CourseCard/CourseCard';
import { AppState } from '../../../../modules/store';
import { selectRole } from '../../../jophiel/modules/userWebSelectors';
import * as courseActions from '../modules/courseActions';

export interface CoursePageProps {
  role: UserRole;
  onGetCourses: () => Promise<CoursesResponse>;
}

export interface CoursesPageState {
  response?: CoursesResponse;
}

class CoursesPage extends React.Component<CoursePageProps, CoursesPageState> {
  state: CoursesPageState = {};

  async componentDidMount() {
    const response = await this.props.onGetCourses();
    this.setState({ response });
  }

  render() {
    return <Card title="Courses">{this.renderCourses()}</Card>;
  }

  private renderCourses = () => {
    const { response } = this.state;
    if (!response) {
      return <LoadingContentCard />;
    }

    const { data: courses, curriculumDescription, courseProgressesMap } = response;

    if (courses.length === 0) {
      return (
        <p>
          <small>No courses.</small>
        </p>
      );
    }

    return (
      <>
        <HtmlText>{curriculumDescription || ''}</HtmlText>
        <hr />
        {courses.map(course => (
          <CourseCard key={course.jid} course={course} progress={courseProgressesMap[course.jid]} />
        ))}
      </>
    );
  };
}

const mapStateToProps = (state: AppState) => ({
  role: selectRole(state),
});
const mapDispatchToProps = {
  onGetCourses: courseActions.getCourses,
};
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
