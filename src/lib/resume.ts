import schema from '@jsonresume/schema/schema.json'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

// export async function findAllResumes(): Promise<string[]> {
//   const contentPath = path.join(process.cwd(), 'content', 'resumes');
//   const entries = await readdir(contentPath);
//   return entries
//     .filter(filename => filename.endsWith('.json'))
//     .map(filename => filename.substring(0, filename.lastIndexOf('.json')));
// }

export async function findResume(name: string): Promise<ResumeSchema | undefined> {
  const contentPath = path.join(process.cwd(), 'content', 'resumes')
  const entries = await readdir(contentPath)
  const file = entries.find(filename => filename === `${name}.json`)

  if (file) {
    const ajv = new Ajv({ strict: false })
    addFormats(ajv)
    const validate = ajv.compile<ResumeSchema>(schema)

    const data = JSON.parse(
      await readFile(path.join(process.cwd(), 'content', 'resumes', file), 'utf8')
    )

    if (validate(data)) {
      return data
    } else {
      console.log(validate.errors)
    }
  }
}
