// @flow

import deleteAtCurrentRange from './delete';
import insertFragment from './insertFragment';
import insertText from './insertText';
import { type Option } from '../type';

function createChanges(opts: Option): Object {
    return {
        insertText: insertText(opts),
        delete: deleteAtCurrentRange(opts),
        insertFragment: insertFragment(opts)
    };
}
export default createChanges;
