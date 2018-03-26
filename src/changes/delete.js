// @flow
import { type Change } from 'slate';

function deleteAtCurrentRange(opts) {
    return (change: Change, options?: Object = {}): Change => {
        const snapshot = !!options.snapshot;
        return opts.deleteAtRange(change, change.value.selection, { snapshot });
    };
}
export default deleteAtCurrentRange;
