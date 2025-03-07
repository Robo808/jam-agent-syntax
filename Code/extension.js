const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

const diagnosticCollection = vscode.languages.createDiagnosticCollection("jam");

function activate(context) {
    const tooltips = JSON.parse(fs.readFileSync(path.join(__dirname, "hoverProvider.json")));

    let hoverProvider = vscode.languages.registerHoverProvider("jam", {
        provideHover(document, position) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            if (tooltips[word]) {
                return new vscode.Hover(`**${word}**\n\n${tooltips[word]}\n\nExample:\n\`\`\`jam\n${exampleFor(word)}\n\`\`\``);
            }
        }
    });

    function validateTextDocument(document) {
        const diagnostics = [];
        const text = document.getText();

        // Check for missing {}
        const planExists = text.match(/\bPLAN:\b/); // Check if "PLAN:" exists anywhere
        if (planExists) {
            const planMatches = text.match(/PLAN:\s*{\s*([\s\S]*?)\s*}/g);
            if (!planMatches || planMatches.length === 0) {
                diagnostics.push(new vscode.Diagnostic(
                    new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 10)),
                    "Syntax Error: Missing `{}` in PLAN definition",
                    vscode.DiagnosticSeverity.Error
                ));
            }
        }



        // Check for missing semicolons in statements
        const missingSemicolon = /(?:PERFORM|EXECUTE|ASSERT|RETRACT|QUERY|POST|UPDATE|WAIT|ACHIEVE)\s+[^\n;]+(?:\n|$)/g;
        let match;
        while ((match = missingSemicolon.exec(text)) !== null) {
            diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length)),
                "Syntax Warning: Statement might be missing a `;`",
                vscode.DiagnosticSeverity.Warning
            ));
        }

        diagnosticCollection.set(document.uri, diagnostics);
    }

    vscode.workspace.onDidOpenTextDocument(validateTextDocument);
    vscode.workspace.onDidChangeTextDocument(e => validateTextDocument(e.document));

    context.subscriptions.push(hoverProvider);
}

// Function to provide example code for hover tooltips
function exampleFor(word) {
    const examples = {
        "GOALS": "GOALS:\n    ACHIEVE move_to \"Office\";",
        "FACTS": "FACTS:\n    FACT location \"Home\";",
        "PLAN": "PLAN: {\n    NAME: \"Travel\"\n    GOAL: ACHIEVE move_to $destination;\n    BODY:\n        EXECUTE print \"Moving...\";\n}",
        "WHEN": "WHEN : TEST ( == $location \"Home\" )\n{\n    EXECUTE print \"Agent is at home.\";\n}",
        "PERFORM": "PERFORM greet \"Alice\";",
        "EXECUTE": "EXECUTE print \"Hello, World!\";",
        "TEST": "TEST ( > $battery 50 );",
        "ASSIGN": "ASSIGN $name \"Agent1\";\nASSIGN $age 5;",
        "WHILE": "WHILE : TEST (< $counter 5)\n{\n    EXECUTE print \"Counter: \" $counter;\n    ASSIGN $counter (+ $counter 1);\n}",
        "FAILURE": "PLAN: {\n    NAME: \"Handle Failure\"\n    GOAL: PERFORM risky_action;\n    BODY:\n        EXECUTE print \"Trying risky action...\";\n    FAILURE:\n        EXECUTE print \"Plan failed, retrying...\";\n        PERFORM risky_action;\n}",
        "RETRIEVEALL": "RETRIEVEALL $itemall item $val;",
        "NEXTFACT": "NEXTFACT $itemall item $val;"
    };
    return examples[word] || "No example available.";
}

function deactivate() { }

module.exports = { activate, deactivate };
