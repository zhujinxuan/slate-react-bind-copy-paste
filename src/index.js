// @flow
import type {
    typeDeleteAtRangeRule,
    typeInsertFragmentAtRangeRule,
    typeGetFragmentAtRangeRule
} from 'slate-bind-copy-paste';

import {
    getFragmentAtRange as getGen,
    insertFragmentAtRange as insertGen,
    deleteAtRange as deleteGen
} from 'slate-bind-copy-paste';

import createChanges from './changes/index';
import createOnKeyDown from './onKeyDown/index';

type pluginInterface = {
    deleteRules?: Array<typeDeleteAtRangeRule>,
    insertRules?: Array<typeInsertFragmentAtRangeRule>,
    getRules: Array<typeGetFragmentAtRangeRule>
};
function createPlugin(pluginOptions: pluginInterface = {}) {
    const { deleteRules, insertRules, getRules } = pluginOptions;
    const deleteAtRange = getGen.generate(getRules);
    const insertFragmentAtRange = insertGen.generate(insertRules);
    const getFragmentAtRange = deleteGen.generate(deleteRules);
    const opts = { deleteAtRange, insertFragmentAtRange, getFragmentAtRange };
    const changes = createChanges(opts);
    const onKeyDown = createOnKeyDown(changes);
    return { onKeyDown, changes };
}

export default createPlugin;
