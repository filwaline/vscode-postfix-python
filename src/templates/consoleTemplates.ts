import * as ts from 'typescript'
import * as vsc from 'vscode'
import { CompletionItemBuilder } from '../completionItemBuilder'
import { BaseExpressionTemplate } from './baseTemplates'

export class ConsoleTemplate extends BaseExpressionTemplate {

  constructor (private level: 'log' | 'warn' | 'error') {
    super()
  }

  buildCompletionItem (code: string, position: vsc.Position, node: ts.Node) {
    return CompletionItemBuilder
      .create(this.level, code)
      .description(`console.${this.level}(expr)`)
      .replace(`console.${this.level}({{expr}})`, position)
      .build()
  }

  isConsoleExpression = (node: ts.Node) => node.kind === ts.SyntaxKind.Identifier && (node as ts.Identifier).text === 'console'

  // disable templates which don't work with Python
  canUse (node: ts.Node) {
    return false
  }
}

export const build = () => [
  new ConsoleTemplate('log'),
  new ConsoleTemplate('warn'),
  new ConsoleTemplate('error')
]
