// @flow
import Debug from 'debug';
import deleteAtCurrentRange, { type typeDelete } from './delete';
import insertFragment, { type typeInsertFragment } from './insertFragment';
import insertText, { type typeInsertText } from './insertText';
import { type Option } from '../type';

export type Changes = {
    insertText: typeInsertText,
    delete: typeDelete,
    insertFragment: typeInsertFragment
};
const debug = new Debug('slate:changes:customized');
function createChanges(opts: Option): Changes {
    return {
        insertText: insertText(opts, debug),
        delete: deleteAtCurrentRange(opts, debug),
        insertFragment: insertFragment(opts, debug)
    };
}
export default createChanges;
