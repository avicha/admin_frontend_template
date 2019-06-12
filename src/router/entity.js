const EntityIndex = () => import('@/layouts/entity/index')
const EntityList = () => import('@/layouts/entity/list')
import {
  loginRequired
} from './middlewares'

const EntityRouter = {
  path: '/entity',
  name: 'EntityIndex',
  beforeEnter: loginRequired,
  component: EntityIndex,
  children: [{
    path: 'list',
    name: 'EntityList',
    component: EntityList
  }]
}
export default EntityRouter