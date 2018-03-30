// @flow

import deleteAtCurrentRange, { type typeDelete } from './delete';
import insertFragment, { type typeInsertFragment } from './insertFragment';
import insertText, { type typeInsertText } from './insertText';
import { type Option } from '../type';

export type Changes = {
    insertText: typeInsertText,
    delete: typeDelete,
    insertFragment: typeInsertFragment
};
function createChanges(opts: Option): Changes {
    return {
        insertText: insertText(opts),
        delete: deleteAtCurrentRange(opts),
        insertFragment: insertFragment(opts)
    };
}
export default createChanges;
