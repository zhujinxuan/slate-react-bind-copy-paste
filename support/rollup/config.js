import factory from './factory';
import packageJSON from '../../package.json';

const configurations = [...factory(packageJSON)];

export default configurations;
