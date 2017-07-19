const path = require('path')
const fs = require('fs')
const dox = require('dox')
const { ascend } = require('167')

exports.parseDocumentation = parseDocumentation

const readSource = file => fs.readFileSync(file).toString()

function parseDocumentation(files) {
  return files
    .map(file => { 
      const parsedComments = parseComments(readSource(file))

      if (!parsedComments) return null

      const { description: { full }, tags, code } = parsedComments
      const [ { string: name }, { string: example } = { string: '' }, type ] = tags

      return {
        file: path.relative(process.cwd(), file),
        description: full,
        name,
        example,
        code,
        type: !!type
      }
    })
    .filter(Boolean)
    .sort(ascend(({ name }) => name))
}

function parseComments(source) {
  const parsedDocs = dox.parseComments(source, { raw: true, skipSignleStar: true })[0]

  const { tags, ignore } = parsedDocs

  if (!tags || tags.length === 0 || ignore) return null

  return parsedDocs
}
