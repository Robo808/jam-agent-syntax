# JAM Agent Syntax Extension for VS Code

This VS Code extension provides syntax highlighting, autocomplete, hover explanations, snippets, and error detection for the JAM Agent programming language.

## Features

- **Syntax Highlighting** – Recognizes JAM-specific keywords, numbers, comments, and variables.
- **Autocomplete** – Provides keyword suggestions and snippet completions.
- **Hover Explanations** – Displays definitions and examples when hovering over JAM keywords.
- **Snippets** – Predefined templates for common JAM constructs.
- **Syntax Validation** – Detects missing `{}` in `PLAN` blocks and missing semicolons.
- **Bracket & Comment Handling** – Ensures correct indentation and structure.

---

## Installation

### Option 1: Install via VSIX (Manual)
1. Download the latest `.vsix` file (or build it from source).
2. Open **VS Code** and navigate to:
   - **Extensions** → Click `...` (three dots) → `Install from VSIX...`
3. Select the `.vsix` file and install.

### Option 2: Install via CLI
1. Open a terminal and run:
   ```sh
   code --install-extension jam-agent-syntax.vsix
   ```

### Option 3: Manual Installation
1. **Extract the extension folder** (if in development mode).
2. Copy it to VS Code’s extension directory:
   - **Windows**:
     ```sh
     xcopy /E /I jam-agent-syntax "%USERPROFILE%\.vscode\extensions\jam-agent-syntax"
     ```
   - **Mac & Linux**:
     ```sh
     cp -r jam-agent-syntax ~/.vscode/extensions/
     ```
3. Restart VS Code.

---

## Building the Extension from Source

If you want to modify or contribute to this extension, follow these steps:

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/jam-agent-syntax.git
cd jam-agent-syntax
```

### 2. Install Dependencies
```sh
npm install -g vsce
```

### 3. Package the Extension
```sh
vsce package
```
This generates a `.vsix` file that can be installed in VS Code.

---

## Usage

- **Syntax Highlighting**: Open any `.jam` file in VS Code.
- **Autocomplete**: Start typing a JAM keyword and press `Tab` or `Enter` to auto-complete.
- **Hover Explanations**: Hover over any JAM keyword to see its description and an example.
- **Snippets**: Type `plan`, `goal`, or `fact`, then press `Tab` to insert predefined templates.
- **Error Checking**: Missing `{}` in `PLAN` or missing `;` in statements will trigger warnings.

---

## Customization

You can modify:
- **`snippets.json`** – Add new code snippets.
- **`hoverProvider.json`** – Add more keyword explanations.
- **`jam.tmLanguage.json`** – Customize syntax highlighting rules.
- **`completionProvider.js`** – Modify autocomplete suggestions.

---

## Troubleshooting

- **Autocomplete not working?** Try reloading VS Code (`Cmd + Shift + P` → `Reload Window`).
- **Extension not recognized?** Ensure it's in the correct folder:
  - **Windows**: `%USERPROFILE%\.vscode\extensions\`
  - **Mac/Linux**: `~/.vscode/extensions/`
- **Errors in JAM code not detected?** Make sure syntax validation is enabled.

---

## License

This extension is released under the **MIT License**.

---

## Contributing

Pull requests and feature suggestions are welcome. If you encounter any issues, feel free to submit a GitHub issue.

---

## Credits

Developed by **Roberto Cezar & Contributors**.
