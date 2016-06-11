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
import PackageView from 'views/PackageView/PackageView'
import ForgotPasswordView from 'views/ForgotPasswordView/ForgotPasswordView'
import ImpressumView from 'views/ImpressumView/ImpressumView'
import FeedbackView from 'views/FeedbackView/FeedbackView'
import DummyPageView from 'views/DummyPageView/DummyPageView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={LandingView} />
    <Route component={Dashboard}>
      <Route path='dashboard' component={DashboardView} />
      <Route path='connects' component={DummyPageView}/>
      <Route path='forgot-password' component={ForgotPasswordView}/>
      <Route path='reset-password/:code' component={ForgotPasswordView}/>
      <Route path='course/:id' component={CourseView} />
      <Route path='feedback' component={FeedbackView} />
      <Route path='course/:id/questions' component={DetailQuestionListView} />
      <Route path='package/:id' component={PackageView} />
      <Route path='material/:id' component={MaterialView} />
      <Route path='question/:id' component={QuestionView} />
      <Route path='impressum' component={ImpressumView} />
      <Route path='feed' component={DummyPageView} />
    </Route>

  </Route>
)

// <Route path='landing' component={LandingView} />
