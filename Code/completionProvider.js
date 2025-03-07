const vscode = require("vscode");

function activate(context) {
    let completionProvider = vscode.languages.registerCompletionItemProvider(
        "jam",
        {
            provideCompletionItems() {
                const keywords = [
                    "GOALS", "FACTS", "PLAN", "WHEN", "PERFORM", "EXECUTE", "TEST",
                    "ASSIGN", "WHILE", "FAILURE", "NAME", "BODY", "GOAL", "RETRIEVEALL",
                    "NEXTFACT", "ACHIEVE", "ASSERT", "RETRACT", "QUERY", "POST", "UPDATE",
                    "WAIT", "MAINTAIN"
                ];

                const completionItems = keywords.map(keyword => new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword));

                // Plan Snippet
                const planSnippet = new vscode.CompletionItem("Plan Template", vscode.CompletionItemKind.Snippet);
                planSnippet.insertText = new vscode.SnippetString(
                    "PLAN: {\n\tNAME: \"${1:Plan Name}\"\n\tGOAL: ${2:GOAL} ${3:Parameter};\n\tBODY:\n\t\t${4:Actions}\n}"
                );
                planSnippet.detail = "Template for defining a PLAN in JAM.";
                completionItems.push(planSnippet);

                // Goal Snippet
                const goalSnippet = new vscode.CompletionItem("Goal Definition", vscode.CompletionItemKind.Snippet);
                goalSnippet.insertText = new vscode.SnippetString("GOALS:\n\tACHIEVE ${1:goal_name};");
                goalSnippet.detail = "Defines a GOAL that the JAM agent should achieve.";
                completionItems.push(goalSnippet);

                // Fact Snippet
                const factSnippet = new vscode.CompletionItem("Fact Definition", vscode.CompletionItemKind.Snippet);
                factSnippet.insertText = new vscode.SnippetString("FACTS:\n\tFACT ${1:name} \"${2:value}\";");
                factSnippet.detail = "Defines a FACT in the agent's world model.";
                completionItems.push(factSnippet);

                // When Condition Snippet
                const whenSnippet = new vscode.CompletionItem("WHEN Condition", vscode.CompletionItemKind.Snippet);
                whenSnippet.insertText = new vscode.SnippetString(
                    "WHEN : TEST (${1:condition})\n{\n\t${2:action}\n}"
                );
                whenSnippet.detail = "Executes an action when a condition is met.";
                completionItems.push(whenSnippet);

                // Perform Action Snippet
                const performSnippet = new vscode.CompletionItem("PERFORM Action", vscode.CompletionItemKind.Snippet);
                performSnippet.insertText = new vscode.SnippetString("PERFORM ${1:action} ${2:parameter};");
                performSnippet.detail = "Instructs the agent to execute a goal.";
                completionItems.push(performSnippet);

                // Execute Command Snippet
                const executeSnippet = new vscode.CompletionItem("EXECUTE Command", vscode.CompletionItemKind.Snippet);
                executeSnippet.insertText = new vscode.SnippetString("EXECUTE print \"${1:message}\";");
                executeSnippet.detail = "Prints a message to the console.";
                completionItems.push(executeSnippet);

                // Assign Variable Snippet
                const assignSnippet = new vscode.CompletionItem("ASSIGN Variable", vscode.CompletionItemKind.Snippet);
                assignSnippet.insertText = new vscode.SnippetString("ASSIGN $${1:var_name} ${2:value};");
                assignSnippet.detail = "Assigns a value to a variable.";
                completionItems.push(assignSnippet);

                // While Loop Snippet
                const whileSnippet = new vscode.CompletionItem("WHILE Loop", vscode.CompletionItemKind.Snippet);
                whileSnippet.insertText = new vscode.SnippetString(
                    "WHILE : TEST (${1:condition})\n{\n\t${2:actions}\n}"
                );
                whileSnippet.detail = "Creates a loop that executes while the condition is true.";
                completionItems.push(whileSnippet);

                return completionItems;
            }
        }
    );

    context.subscriptions.push(completionProvider);
}

function deactivate() { }

module.exports = { activate, deactivate };
