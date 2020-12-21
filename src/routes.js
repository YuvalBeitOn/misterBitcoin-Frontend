import HomePage from './pages/HomePage/HomePage'
import ContactPage from './pages/ContactPage/ContactPage'
import ContactDetailsPage from './pages/ContactDetailsPage/ContactDetailsPage'
import StatisticPage from './pages/StatisticPage/StatisticPage'
import ContactEditPage from './pages/ContactEditPage/ContactEditPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import UserProfile from './pages/UserProfile/UserProfile'

const Routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/contacts',
        component: ContactPage
    },
    {
        path: '/contact/edit/:id?',
        component: ContactEditPage
    },
    {
        path: '/contact/:contactId',
        component: ContactDetailsPage
    },
    {
        path: '/statistics',
        component: StatisticPage
    },
    {
        path: '/signup',
        component: SignUpPage
    },
    {
        path: '/userProfile',
        component: UserProfile
    }

]

export default Routes
