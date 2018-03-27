// @flow
import { type Change } from 'slate';

function deleteAtCurrentRange(opts) {
    return (change: Change, options?: Object = { snapshot: true }): Change => {
        const { snapshot }: { snapshot: boolean } = options;
        return opts.deleteAtRange(change, change.value.selection, { snapshot });
    };
}
export default deleteAtCurrentRange;
