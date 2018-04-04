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
import Debug from 'debug';

import createChanges from './changes/index';
import onCopy from './onCopy';
import onPaste from './onPaste';
import onBeforeInput from './onBeforeInput';

const eventDebugger = new Debug('slate:after:customized');

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
    return {
        onKeyDown,
        changes,
        onCopy: onCopy(opts, eventDebugger),
        onPaste: onPaste(opts, changes, eventDebugger),
        onBeforeInput: onBeforeInput(opts, changes, eventDebugger)
    };
}

export default createPlugin;
