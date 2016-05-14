import React from 'react'
import { Route, IndexRoute } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import Dashboard from 'layouts/DashboardLayout/DashboardLayout'
import HomeView from 'views/HomeView/HomeView'
import LandingView from 'views/LandingView/LandingView'
import DashboardView from 'views/DashboardView/DashboardView'
import CourseView from 'views/CourseView/CourseView'
import MaterialView from 'views/MaterialView/MaterialView'
import DetailQuestionListView from 'views/DetailQuestionListView/DetailQuestionListView'
import QuestionView from 'views/QuestionView/QuestionView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route component={Dashboard}>
      <Route path='landing' component={LandingView} />
      <Route path='dashboard' component={DashboardView} />
      <Route path='connects' component={DashboardView}/>
      <Route path='course/:id' component={CourseView} />
      <Route path='course/:id/materials' component={CourseView} />
      <Route path='course/:id/materials/:id' component={MaterialView} />
      <Route path='detailQuestions' component={DetailQuestionListView} />
      <Route path='questionsView' component={QuestionView} />
    </Route>

  </Route>
)
