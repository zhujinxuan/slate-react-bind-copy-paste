// @flow
import { type Change } from 'slate';
import { type Option } from '../type';

function deleteAtCurrentRange(opts: Option) {
    return (change: Change, options?: Object = { snapshot: true }): Change => {
        const { snapshot }: { snapshot: boolean } = options;
        return opts.deleteAtRange(change, change.value.selection, { snapshot });
    };
}
export default deleteAtCurrentRange;
