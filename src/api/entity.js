import API from './index'
const { listEntity, getEntity, createEntity, updateEntity, deleteEntity, restoreEntity } = API.restful('Entity', '/entity')
export { listEntity, getEntity, createEntity, updateEntity, deleteEntity, restoreEntity }