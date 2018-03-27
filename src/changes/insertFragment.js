// @flow
//
import { type Change, type Document } from 'slate';

function insertFragment(opts) {
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
