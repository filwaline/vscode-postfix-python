import * as ts from 'typescript'
import * as vsc from 'vscode'
import { CompletionItemBuilder } from '../completionItemBuilder'
import { BaseExpressionTemplate } from './baseTemplates'

export class VarTemplate extends BaseExpressionTemplate {
  constructor (private keyword: 'var' | 'let' | 'const') {
    super()
  }

  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create(this.keyword, code)
      .description(`${this.keyword} name = expr`)
      .replace(this.keyword + ' ${1:name} = {{expr}}$0', position, true)
      .build()
  }

    // disable templates which don't work with Python
    canUse (node: ts.Node) {
      return this.isTestMode()
    }
}

export const build = () => [
  new VarTemplate('var'),
  new VarTemplate('let'),
  new VarTemplate('const')
]
