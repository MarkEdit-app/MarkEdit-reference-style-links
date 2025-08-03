# MarkEdit-reference-style-links

Insert [reference style links](https://www.markdownguide.org/basic-syntax/#reference-style-links) easily in [MarkEdit](https://github.com/MarkEdit-app/MarkEdit).

> See [MarkEdit-app/MarkEdit#982](https://github.com/MarkEdit-app/MarkEdit/issues/982) for details.

## Installation

Copy [dist/markedit-reference-style-links.js](dist/markedit-reference-style-links.js) to `~/Library/Containers/app.cyan.markedit/Data/Documents/scripts/`.

You can also run `yarn install && yarn build` to build and deploy the script.

## Settings

In [settings.json](https://github.com/MarkEdit-app/MarkEdit/wiki/Customization#advanced-settings), you can define a settings node named `extension.markeditReferenceStyleLinks` to configure this extension, default settings are:

```json
{
  "extension.markeditReferenceStyleLinks": {
    "keyboardShortcut": "Mod-k",
    "defaultTitle": "title",
    "defaultReference": "reference"
  }
}
```

- `keyboardShortcut`: The keyboard shortcut, see specs [here](https://codemirror.net/docs/ref/#view.KeyBinding).
- `defaultTitle`: The default link title.
- `defaultReference`: The default link reference.
