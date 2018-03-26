// @flow

import deleteAtCurrentRange from './delete';
import insertFragment from './insertFragment';
import insertText from './insertText';

function createChanges(opts): Object {
    return {
        insertText: insertText(opts),
        delete: deleteAtCurrentRange(opts),
        insertFragment: insertFragment(opts)
    };
}
export default createChanges;
