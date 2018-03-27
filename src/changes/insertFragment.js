// @flow
//
import { type Change, type Document } from 'slate';
import { type Option } from '../type';

function insertFragment(opts: Option) {
    return (change: Change, fragment: Document, options?: Object = {}) => {
        const snapshot = !!options.snapshot;
        return opts.insertFragmentAtRange(
            change,
            change.value.selection,
            fragment,
            { snapshot, select: true }
        );
    };
}
export default insertFragment;
