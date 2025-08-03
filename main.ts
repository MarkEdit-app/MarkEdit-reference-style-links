import { EditorSelection } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { JSONObject, JSONValue, MarkEdit } from 'markedit-api';

const toObject = (value: JSONValue, fallback = {}) => (value ?? fallback) as JSONObject;
const settings = toObject(toObject(MarkEdit.userSettings)['extension.markeditReferenceStyleLinks']);
const keyboardShortcut = (settings.keyboardShortcut ?? 'Mod-k') as string;
const defaultTitle = (settings.defaultTitle ?? 'title') as string;
const defaultReference = (settings.defaultReference ?? 'reference') as string;

async function handle() {
  const editor = MarkEdit.editorView;
  const state = editor.state;
  const selection = state.selection.main;

  const title = (() => {
    const slice = state.doc.sliceString(selection.from, selection.to);
    return slice.length === 0 ? defaultTitle : slice;
  })();

  const url = await (async () => {
    const copied = await MarkEdit.getPasteboardString();
    return copied === undefined ? '' : copied.match(/https?:\/\/[^\s"'`<>]+/)?.[0] ?? '';
  })();

  const reference = (() => {
    const match = url.match(/^https?:\/\/(?:[\w-]+\.)*([\w-]+)(?:\.\w+)+/i);
    return match ? match[1] : undefined;
  })() ?? defaultReference;

  const offset = selection.empty ? title.length : 0;
  const firstPos = offset + selection.to + 3; // "[][".length
  const lineTo = state.doc.lineAt(selection.from).to;
  const secondPos = offset + lineTo + state.lineBreak.length * 2 + reference.length + 5; // "[][][".length

  editor.dispatch({
    changes: [
      {
        from: selection.from,
        to: selection.to,
        insert: `[${title}][${reference}]`,
      },
      {
        from: lineTo,
        insert: `${state.lineBreak}${state.lineBreak}[${reference}]: ${url}`,
      },
    ],
    selection: EditorSelection.create([
      EditorSelection.range(firstPos, firstPos + reference.length),
      EditorSelection.range(secondPos, secondPos + reference.length),
    ]),
  });
}

MarkEdit.addExtension(keymap.of([{
  key: keyboardShortcut,
  preventDefault: true,
  run: () => {
    handle();
    return true;
  },
}]));
