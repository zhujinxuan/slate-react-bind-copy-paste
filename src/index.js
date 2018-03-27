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
import { type Document } from 'slate';

import createChanges from './changes/index';
// import createOnKeyDown from './onKeyDown/index';
import createOnCopy from './onCopy';
import createOnPaste from './onPaste';

type pluginInterface = {
    rules: {
        deleteAtRange?: Array<typeDeleteAtRangeRule>,
        insertFragmentAtRange?: Array<typeInsertFragmentAtRangeRule>,
        getFragmentAtRange: Array<typeGetFragmentAtRangeRule>
    },
    htmlSerializer?: {
        serialize: Document => string,
        deserialize: string => Document
    }
};
function createPlugin(pluginOptions: pluginInterface = {}) {
    const { rules, htmlSerializer } = pluginOptions;
    const deleteAtRange = deleteGen.generate(rules.deleteAtRange);
    const insertFragmentAtRange = insertGen.generate(
        rules.insertFragmentAtRange,
        {
            deleteAtRange
        }
    );
    const getFragmentAtRange = getGen.generate(rules.getFragmentAtRange);
    const opts = {
        deleteAtRange,
        insertFragmentAtRange,
        getFragmentAtRange,
        htmlSerializer
    };
    const changes = createChanges(opts);
    const onKeyDown = () => null;
    const onCopy = createOnCopy(opts);
    const onPaste = createOnPaste(opts, changes);
    return { onKeyDown, changes, onCopy, onPaste };
}

export default createPlugin;
